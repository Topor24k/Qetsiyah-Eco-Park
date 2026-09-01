# PayMongo Integration Plan

This document outlines the step-by-step plan for integrating PayMongo into the Qetsiyah Eco Park / Wyattel Hotel website. It is designed to be easy for you (the freelancer) to implement, while ensuring all legal and financial liabilities remain safely with the client (the business owner).

## Phase 1: Client Onboarding (Action Required by Business Owner)

As a freelancer, **you should not create this account**. The business owner must create it because it requires their business permits, bank accounts, and valid IDs.

**Instructions to send your client:**
1. Go to [PayMongo.com](https://paymongo.com/) and click **Sign Up**.
2. Complete the business activation process. They will need to submit:
   - Valid Government ID
   - DTI / SEC Registration (if registered as a business) or Barangay Clearance (if sole proprietor/individual).
   - Bank Account details (where the money will be deposited).
3. Once approved by PayMongo (usually takes 1-3 business days), ask the client to generate a **PayMongo Page (Payment Link)**.
4. Have the client copy the URL of that Payment Link and send it to you.

---

## Phase 2: Technical Implementation (Action Required by You/Developer)

Since this website is a front-end React application (Vite) without a custom backend server, we will use the **PayMongo Pages / Redirect Strategy**. This is the safest and most professional method.

### 1. Update the Checkout Modal
We will modify the existing Wyattel Delivery checkout form to include a specific "Pay via Card / E-Wallet" option.

- **Current Options:** *Charge to Room*, *Cash on Delivery*
- **New Option:** *Pay Online (Credit Card, GCash, Maya)*

### 2. Implement the Routing Logic
When the user clicks "Confirm Order":

**If they selected "Pay Online":**
1. The system calculates the total order amount.
2. The system formats a WhatsApp message containing their order details and sends it to the kitchen (so the kitchen knows what food to prepare).
3. Immediately after sending the WhatsApp message, the website redirects the user's browser to the **Client's PayMongo Link**.
4. The user types their credit card details directly into PayMongo's ultra-secure website.
5. The transaction completes, and the client receives the money in their bank account.

**If they selected "COD" or "Charge to Room":**
1. The system proceeds normally with the existing WhatsApp routing.

---

## Alternative: Full API Integration (Optional)

If the client insists that they do not want the user to be redirected, and wants the user to type their credit card numbers directly on the Qetsiyah website:

1. **Requires a Backend Server:** We would need to set up a Node.js/Express server (e.g., using Render, Heroku, or Vercel Serverless Functions).
2. **API Keys:** The client must provide their secret PayMongo API Keys.
3. **PCI Compliance:** You must ensure the website is fully HTTPS and uses PayMongo's secure UI elements.
4. **Development Time:** This takes significantly more time (and you should charge the client more for this level of integration).

> **Recommendation:** Stick to the **Phase 2 (Payment Link Redirect)** method! It gives the customer a 100% professional credit card checkout experience, but saves you days of coding and completely protects you from security liabilities.

---

## Next Steps

1. Send the instructions in **Phase 1** to your client.
2. Once they give you the link, provide the link to me (the AI assistant).
3. I will instantly update the `FoodOffersFrame.jsx` code to route the online payments to that link!
