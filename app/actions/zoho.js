"use server";
export async function GenerateZohoToken() {
  const res = await fetch(
    `https://accounts.zoho.in/oauth/v2/token?code=1000.e35904a77d7aa1e0ef997431037fa779.1c2918f94e78a2359d0ce98edc6cedca&client_id=1000.CFR8BCBP5MX880NU01WXVV9E977HQG&client_secret=0e3e6511a36bdb6a31432866ee79e0027ab2e09321&redirect_uri=http://www.zoho.com/books&grant_type=authorization_code
`,
    {
      method: "POST",
    }
  );
  const res_data = await res.json();
  console.log("Zoho reply>>>> ", res_data);
}

export async function getCustomerIdByEmail(email) {
  try {
    const response = await fetch(
      `https://zohoapis.in/books/v3/customers?email=${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error fetching customer:", errorData);
      throw new Error("Failed to fetch customer.");
    }

    const data = await response.json();
    if (data.customers.length > 0) {
      console.log("Customer id>>", data.customers[0].customer_id);
      return data.customers[0].customer_id; // Return the customer ID
    } else {
      throw new Error("Customer not found.");
    }
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw new Error("Failed to fetch customer.");
  }
}

export async function createZohoInvoice(paymentData) {
  const invoiceData = {
    customer_id: paymentData.customer_id,
    date: new Date().toISOString().split("T")[0],
    line_items: [
      {
        item_id: paymentData.item_id,
        rate: paymentData.amount,
        quantity: 1,
      },
    ],
  };

  try {
    const response = await fetch("https://books.zoho.com/api/v3/invoices", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ZOHO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: invoiceData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating invoice in Zoho Books:", errorData);
      throw new Error("Failed to create invoice in Zoho Books.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw new Error("Failed to create invoice in Zoho Books.");
  }
}
