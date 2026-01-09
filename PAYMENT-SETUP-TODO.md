# Payment Setup - Action Items Checklist

**Business:** Bradley Brown Inc
**Website:** https://bradleybrowninc.com/payment
**Date:** January 9, 2026
**Status:** Implementation Complete - Activation Required

---

## ✅ COMPLETED (Already Done)

- [x] Payment page design and development
- [x] Stripe integration code
- [x] Klarna SDK integration
- [x] Zelle payment information setup
- [x] Venmo integration enhancement
- [x] Responsive mobile design
- [x] Code deployed to production
- [x] Site live on Cloudflare Pages

---

## 🔴 CRITICAL - Setup Required for Stripe

### **TASK 1: Create Stripe Payment Link** (Priority: HIGH)

**Estimated Time:** 10-15 minutes
**Required to:** Accept credit card payments on your website

#### Step-by-Step Instructions:

1. **Create a Stripe Account** (if you don't have one)
   - Go to: https://dashboard.stripe.com/register
   - Enter your business information
   - Verify your email address
   - Complete business verification (bank account, tax info)
   - **Note:** You can create payment links immediately, but need full verification to receive payouts

2. **Create a Payment Link**
   - Log in to: https://dashboard.stripe.com
   - Click **"Payment Links"** in the left sidebar
   - Click **"+ New"** or **"Create Payment Link"** button
   - Choose your payment link type:
     - **RECOMMENDED:** "Customers choose amount" (for flexible payment amounts)
     - Alternative: Set fixed amount for specific invoices

3. **Configure Payment Link Settings**

   ```
   Name: Bradley Brown Inc Payment
   Description: Payment for construction services

   Payment Options:
   ☑️ Card payments
   ☑️ Apple Pay
   ☑️ Google Pay
   ☑️ Link (Stripe's one-click payment)

   Currency: USD

   After payment:
   ☑️ Redirect to: https://bradleybrowninc.com/thank-you

   Optional:
   ☑️ Require customer email
   ☑️ Allow customers to add note/memo
   ```

4. **Copy Your Payment Link**
   - After creating, Stripe will show your payment link
   - Example: `https://buy.stripe.com/test_abc123xyz789`
   - **Copy this URL - you'll need it in the next step**

5. **Update Your Website Code**
   - Open file: `src/pages/payment.js`
   - Find line 28 (currently shows):
     ```javascript
     const stripePaymentLink = "https://buy.stripe.com/your-payment-link"
     ```
   - Replace with YOUR actual Stripe link:
     ```javascript
     const stripePaymentLink = "https://buy.stripe.com/live_YOUR_ACTUAL_LINK"
     ```
   - Save the file

6. **Deploy Updated Code**
   - Option A (if using Git):
     ```bash
     git add src/pages/payment.js
     git commit -m "Add Stripe payment link"
     git push origin master
     ```
   - Option B: Contact your developer (Corey Hughes) to update

7. **Test Your Payment Link**
   - Visit: https://bradleybrowninc.com/payment
   - Click the **Stripe** tab
   - Click **"Pay with Stripe"** button
   - Verify it opens your Stripe payment page
   - **Test Mode:** Use test card `4242 4242 4242 4242` (any future date, any CVC)

#### Verification Checklist:

- [ ] Stripe account created and verified
- [ ] Payment link created in Stripe dashboard
- [ ] Payment link URL copied
- [ ] Website code updated with real payment link
- [ ] Changes deployed to production
- [ ] Payment link tested and working

#### Support Resources:

- **Stripe Help:** https://support.stripe.com
- **Stripe Documentation:** https://stripe.com/docs/payment-links
- **Phone Support:** 1-888-926-2289 (Stripe)

---

## 🟡 OPTIONAL - Setup Klarna Financing

### **TASK 2: Apply for Klarna Merchant Account** (Priority: MEDIUM)

**Estimated Time:** 20-30 minutes application + 2-5 business days approval
**Benefit:** Offer financing for projects $1,000+
**Note:** This is optional - Zelle and Stripe work without this

#### When to Set This Up:

- ✅ If you frequently work on projects over $1,000
- ✅ If clients ask about payment plans or financing
- ✅ If you want to increase conversion on larger projects
- ❌ Skip if most payments are under $500
- ❌ Skip if you don't want to pay 3-6% transaction fees

#### Step-by-Step Instructions:

1. **Start Klarna Application**
   - Go to: https://www.klarna.com/us/business/
   - Click **"Get Started"** or **"Sign Up"**
   - Choose: **"I want to accept payments"**

2. **Business Information Required**

   ```
   Business Name: Bradley Brown Inc
   Business Type: Sole Proprietor / LLC / Corporation (choose your type)
   Industry: Construction / Home Services
   Tax ID: Your EIN or SSN
   Website: https://bradleybrowninc.com
   Estimated Monthly Sales: (your estimate)
   Average Transaction Size: (your average project cost)
   ```

3. **Bank Account Information**
   - Bank name
   - Account number (for receiving payments)
   - Routing number

4. **Business Documentation** (have these ready)
   - Business license (your MS contractor license)
   - Bank statement (last 3 months)
   - Tax returns (last year - optional)
   - Website verification

5. **Wait for Approval**
   - Klarna typically responds in 2-5 business days
   - They may request additional documentation
   - Approval depends on business history and credit

6. **After Approval - Update Website**
   - You'll receive Klarna merchant credentials
   - Contact your developer (Corey Hughes) to:
     - Enable the Klarna payment button
     - Update button from "Coming Soon" to "Pay with Klarna"
     - Configure Klarna merchant ID

7. **Test Klarna Integration**
   - Visit: https://bradleybrowninc.com/payment
   - Click **Klarna** tab
   - Verify messaging shows correct financing terms
   - Test a payment in Klarna's sandbox mode

#### Verification Checklist:

- [ ] Klarna application submitted
- [ ] Business documentation provided
- [ ] Merchant account approved
- [ ] Credentials received from Klarna
- [ ] Developer notified to enable functionality
- [ ] Website updated and tested

#### Support Resources:

- **Klarna Merchant Support:** merchants@klarna.com
- **Phone:** 1-844-552-7621
- **Help Center:** https://docs.klarna.com/

---

## 🟢 READY TO USE - No Action Required

### **Zelle - 100% Functional**

- ✅ Email configured: bradleybrowninc@gmail.com
- ✅ Instructions displayed on payment page
- ✅ Clients can pay immediately
- ✅ Zero fees - keep 100% of payment
- **RECOMMENDATION:** Promote this method for large payments to save on fees

### **Venmo - 100% Functional**

- ✅ Username: @bradleybrowninc
- ✅ Profile linked: https://venmo.com/bradleybrowninc
- ✅ Deep linking for mobile app
- ✅ Web fallback configured
- **NOTE:** Free for personal payments, 2.75% for business transactions

---

## 📊 Monitoring & Analytics

### **TASK 3: Track Payment Method Usage**

**Estimated Time:** 5 minutes setup
**Frequency:** Review weekly/monthly

#### What to Monitor:

1. **Payment Page Traffic**
   - Log in to Google Analytics or Tag Manager
   - Check visits to: `/payment`
   - Track which payment tabs are clicked

2. **Conversion Tracking**
   - Set up goal in Google Analytics for payment page visits
   - Track click events on payment buttons
   - Monitor form submissions on thank-you page

3. **Payment Method Preferences**
   - Track which payment methods clients use most
   - Compare transaction volumes by method
   - Calculate fees paid per method

#### Monthly Report Template:

```
Month: ___________

Total Payments Received: $__________

Payment Method Breakdown:
- Stripe (Credit Card): ____ payments, $______ total, $____ fees (2.9%)
- Klarna (Financing):   ____ payments, $______ total, $____ fees (3-6%)
- Zelle (Bank):         ____ payments, $______ total, $0 fees
- Venmo (Mobile):       ____ payments, $______ total, $____ fees (2.75%)

Total Fees Paid: $______
Cost Savings from Zelle: $______
```

#### Verification Checklist:

- [ ] Google Analytics goals configured
- [ ] Payment page tracking active
- [ ] Monthly reporting schedule set
- [ ] Dashboard created for quick view

---

## 🔐 Security & Compliance

### **TASK 4: Payment Security Verification**

**Estimated Time:** 10 minutes
**Frequency:** One-time setup

#### Action Items:

1. **Verify HTTPS is Active**
   - [ ] Visit https://bradleybrowninc.com/payment
   - [ ] Confirm lock icon in browser address bar
   - [ ] Verify certificate is valid

2. **PCI Compliance**
   - [ ] **Stripe:** Automatically PCI compliant (Stripe handles card data)
   - [ ] **Klarna:** Automatically compliant (Klarna handles data)
   - [ ] **Website:** No card data stored on your server ✅

3. **Privacy Policy Update**
   - [ ] Verify privacy policy mentions payment processing
   - [ ] Link to Stripe and Klarna privacy policies
   - [ ] Update if necessary (currently at /privacy-policy)

4. **Record Keeping**
   - [ ] Set up system to track received payments
   - [ ] Match payments to invoices/projects
   - [ ] Keep records for tax purposes (7 years recommended)

5. **Fraud Prevention**
   - [ ] Enable Stripe Radar (automatic fraud detection)
   - [ ] Set up email notifications for payments received
   - [ ] Review suspicious transactions

---

## 📱 Client Communication

### **TASK 5: Announce New Payment Options**

**Estimated Time:** 30 minutes
**Frequency:** One-time announcement

#### Communication Channels:

1. **Email Campaign**

   ```
   Subject: New Payment Options Available!

   Dear Valued Client,

   We're excited to announce that we now accept multiple payment
   methods for your convenience:

   💳 Credit/Debit Cards (Stripe) - Instant processing
   📊 Financing (Klarna) - Pay over time for larger projects
   🏦 Zelle - FREE bank transfers (no fees!)
   📱 Venmo - Quick mobile payments

   Visit: https://bradleybrowninc.com/payment

   Questions? Call us at 601-954-1306
   ```

2. **Social Media Posts**
   - Facebook, Instagram, LinkedIn
   - Post image of payment page
   - Emphasize convenience and flexibility

3. **Update Invoices/Quotes**
   - Add payment page link to invoices
   - Include QR code to payment page
   - List accepted payment methods

4. **Update Business Cards**
   - Add "Multiple payment options available"
   - Include bradleybrowninc.com/payment

#### Verification Checklist:

- [ ] Email campaign drafted and sent
- [ ] Social media posts scheduled
- [ ] Invoice template updated
- [ ] Business cards reprinted (optional)
- [ ] Phone greeting mentions payment options

---

## 🎯 Success Metrics

### Goals (3 months after launch):

1. **Payment Method Adoption**
   - [ ] At least 50% of clients use online payment options
   - [ ] Reduce cash/check payments by 30%
   - [ ] Average payment processing time under 24 hours

2. **Cost Savings**
   - [ ] 30%+ of payments via Zelle (0% fees)
   - [ ] Total processing fees under 2% of revenue
   - [ ] Save $500+ per month vs traditional merchant accounts

3. **Customer Satisfaction**
   - [ ] Positive feedback on payment convenience
   - [ ] Fewer payment-related support calls
   - [ ] Faster project kickoffs (deposits received quicker)

---

## 🆘 Troubleshooting & Support

### Common Issues:

**Issue:** Stripe payment link doesn't work

- **Solution:** Verify payment link is active in Stripe dashboard
- **Check:** URL copied correctly in payment.js file
- **Test:** Use Stripe's test mode first

**Issue:** Client can't find payment page

- **Solution:** Direct link: bradleybrowninc.com/payment
- **Check:** Footer navigation has "Make Payment" link
- **Share:** Send direct link via email/text

**Issue:** Payment received but not reflected

- **Solution:** Check Stripe dashboard for payouts schedule
- **Note:** Stripe holds funds 2-7 days for new accounts
- **After verification:** Payouts typically next business day

### Who to Contact:

**Technical Issues (Website/Code):**

- Corey Hughes
- Email: corey@verticalconsulting.net
- Phone: [Your developer's phone]

**Stripe Support:**

- Help: https://support.stripe.com
- Phone: 1-888-926-2289
- Email: support@stripe.com

**Klarna Support:**

- Email: merchants@klarna.com
- Phone: 1-844-552-7621

**General Business/Payment Questions:**

- Bradley Brown Inc
- Phone: 601-954-1306
- Email: bradleybrowninc@gmail.com

---

## 📋 Quick Reference

### Payment Method Comparison:

| Method     | Fees         | Speed   | Best For                 |
| ---------- | ------------ | ------- | ------------------------ |
| **Zelle**  | 0%           | Minutes | Large payments, deposits |
| **Stripe** | 2.9% + $0.30 | Instant | Credit cards, any size   |
| **Klarna** | 3-6%         | Instant | Projects $1,000+         |
| **Venmo**  | 0-2.75%      | Instant | Small payments, mobile   |

### Quick Links:

- 🌐 Payment Page: https://bradleybrowninc.com/payment
- 💳 Stripe Dashboard: https://dashboard.stripe.com
- 📊 Klarna Portal: https://portal.klarna.com
- 📱 Venmo Profile: https://venmo.com/bradleybrowninc

---

## ✅ Final Checklist

**Before Announcing Payment Options:**

- [ ] Stripe payment link created and tested
- [ ] Klarna account approved (if using)
- [ ] All payment methods tested
- [ ] Analytics tracking configured
- [ ] Privacy policy reviewed
- [ ] Team trained on payment process
- [ ] Client communication prepared
- [ ] Support resources documented

**Ongoing Maintenance:**

- [ ] Weekly: Check payment notifications
- [ ] Monthly: Review analytics and fees
- [ ] Quarterly: Update payment methods as needed
- [ ] Annually: Review contracts and agreements

---

**Document Version:** 1.0
**Created:** January 9, 2026
**Priority Level:** HIGH (Stripe setup required)
**Estimated Total Time:** 30-45 minutes (excluding Klarna approval wait time)

**Questions?** Contact Corey Hughes at corey@verticalconsulting.net
