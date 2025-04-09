const CheckoutButton = () => {
    const handleClick = async () => {
      const res = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [
            {
              price_data: {
                currency: "usd",
                product_data: { name: "Cool T-shirt" },
                unit_amount: 2000,
              },
              quantity: 1,
            },
          ],
        }),
      });
      const data = await res.json();
      window.location = data.url;
    };
  
    return <button onClick={handleClick}>Buy Now</button>;
  };
  
  export default CheckoutButton;
  