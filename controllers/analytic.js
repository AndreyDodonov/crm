'use strict';

const Order = require('../models/Order'),
    errorHandler = require('../utils/errorHandlers'),
    moment = require('moment');

const FDate = 'DD.MM.YYYY'; // date format fo moment.js

module.exports.overview = async function (req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1}); // list of all orders
        const ordersMap = getOrdersMap(allOrders); // grouping by day of the week
        const yesterdayOrders = ordersMap[moment().add(-1, 'd').format(FDate)] || [];

        // the quantity of orders
        const totalOrdersNumber = allOrders.length;
        // the quantity of yesterday orders
        const yesterdayOrdersNumber = yesterdayOrders.length;
        // the quantity of days overall
        const daysNumber = Object.keys(ordersMap).length;
        // orders per day
        const ordersPerDay = (totalOrdersNumber / daysNumber).toFixed(0);
        // % for the quantity of order
        const ordersPercent = (((yesterdayOrdersNumber / ordersPerDay) - 1) * 100).toFixed(2);
        // total revenue
        const totalGain = calculatePrice(allOrders);
        // revenue per day
        const gainPerDay = totalGain / daysNumber;
        // revenue yesterday
        const yesterdayGain = calculatePrice(yesterdayOrders);
        // % of revenue
        const gainPercent = (((yesterdayGain / gainPerDay) - 1) * 100).toFixed(2);
        // revenue comparison
        const compareGain = (yesterdayGain - gainPerDay).toFixed(2);
        // comparison of the number of orders
        const compareNumber = (yesterdayOrdersNumber - ordersPerDay).toFixed(2);

        res.status(200).json({
            gain: {
                percent: Math.abs(+gainPercent),
                compare: Math.abs(+compareGain),
                yesterday: +yesterdayGain,
                isHigher: +gainPercent > 0
            },
            orders: {
                percent: Math.abs(+ordersPercent),
                compare: Math.abs(+compareNumber),
                yesterday: +yesterdayOrdersNumber,
                isHigher: +ordersPercent > 0
            }
        })


    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.analytic = async function (req, res) {
    try {
        const allOrders = await Order.find({user: req.user.id}).sort({date: 1});
        const ordersMap = getOrdersMap(allOrders);

        const average = +(calculatePrice(allOrders) / Object.keys(ordersMap).length).toFixed(2);

        const chart = Object.keys(ordersMap).map(label => {
            // label == 22.11.2019
            const gain = calculatePrice(ordersMap[label]);
            const order = ordersMap[label].length;

            return {label, order, gain}
        });

        res.status(200).json({average, chart});

    } catch (e) {
        errorHandler(res, e);
    }
};

function getOrdersMap(orders = []) {
    const daysOrders = {};
    orders.forEach(order => {
        const date = moment(order.date).format(FDate);

        if (date === moment().format(FDate)) {
            return;
        }

        if (!daysOrders[date]) {
            daysOrders[date] = [];
        }
        daysOrders[date].push(order);
    });
    return daysOrders;
}

function calculatePrice(orders = []) {
    return orders.reduce((total, order) => {
        const orderPrice = order.list.reduce((orderTotal, item) => {
            return orderTotal += item.cost * item.quantity
        });
        return total += orderPrice;
    }, 0);
}
