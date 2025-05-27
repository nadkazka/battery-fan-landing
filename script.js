const scrollToOrder = () => {
    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
};

document.getElementById("orderForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        name: e.target.name.value,
        phone: e.target.phone.value,
        city: e.target.city.value,
        postOffice: e.target.postOffice.value,
    };

    try {
        const response = await fetch("/.netlify/functions/submitOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
        } else {
            alert(`Помилка: ${result.error}`);
        }
    } catch (error) {
        alert("Помилка підключення. Спробуйте пізніше.");
    }
});
