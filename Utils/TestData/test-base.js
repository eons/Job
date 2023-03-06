const base= require('@playwright/test');

exports.customeTestData= base.test.extend(
    {
        testDataForOrders: 
        {
            userName: "eons@gmail.com",
            password: "adminMx23!",
            productName: "iphone 13 pro",
            country: "Mexico"
        }   
    })