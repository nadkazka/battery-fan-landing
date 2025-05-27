const fetch = require("node-fetch");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed",
        };
    }

    const data = JSON.parse(event.body);

    if (!data.name || !data.phone || !data.city || !data.postOffice) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Всі поля обов'язкові." }),
        };
    }

    // Обробка замовлення (наприклад, надсилання до API або збереження)
    try {
        // Приклад: надсилання до вебхука
        const webhookUrl = "https://ваш-сервер.com/api/orders";
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Не вдалося надіслати замовлення.");
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Замовлення успішно надіслано!" }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
