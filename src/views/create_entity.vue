<template>
  <div class="content">
    <HeaderSection />
    <h4>create entity</h4>
    <br />
    <!-- Nav pills -->
    <ul class="nav nav-pills justify-content-center" role="tablist">
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#supplier">Supplier</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#purchase">Purchase</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#product">Product</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#customer">Customer</a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#sale">Sale</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#account">Account</a>
      </li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div id="supplier" class="container tab-pane">
        <br />
        <!-- SUPPLIER INFO -->
        <form @submit.prevent="supplierSubmitForm">
          <fieldset>
            <legend>Supplier</legend>
            <label>Name:</label><br /><input
              type="text"
              v-model="supplier.supplierName"
            /><br /><label>Country:</label><br /><input
              type="text"
              v-model="supplier.country"
            /><br /><label>City/Town:</label><br /><input
              type="text"
              v-model="supplier.city"
            /><br /><label>Street:</label><br /><input
              type="text"
              v-model="supplier.street"
            /><br /><label>Address:</label><br /><input
              type="text"
              v-model="supplier.address"
            /><br /><label>Telephone:</label><br /><input
              type="text"
              v-model="supplier.telephone"
            /><br /><label>Email:</label><br /><input
              type="email"
              v-model="supplier.email"
            /><br /><label>Website:</label><br /><input
              type="url"
              v-model="supplier.website"
            />
            <br /><br />
            <button class="btn btn-success submit" type="submit">Save</button>
            <p><span id="message"></span></p>
          </fieldset>
        </form>
      </div>
      <div id="purchase" class="container tab-pane">
        <br />
        <!-- SUPPLY DETAILS -->
        <form @submit="purchaseSubmitForm">
          <fieldset>
            <legend>Product supplied</legend>
            <label>Units Supplied:</label><br /><input
              type="number"
              v-model="purchase.unitsPurchased"
            /><br /><label>Unit Cost:</label><br /><input
              type="number"
              v-model="purchase.unitCost"
            /><br /><label>Total Cost:</label><br /><input
              type="number"
              v-model="purchase.totalCost"
              readonly
            /><br /><label>Note:</label><br />
            <input type="text" v-model="purchase.note" />
            <br /><br />
            <button class="btn btn-success submit" type="submit">Save</button>
            <p><span id="message"></span></p>
          </fieldset>
        </form>
      </div>
      <div id="product" class="container tab-pane">
        <br />
        <!-- STOCK COUNT -->
        <form @submit.prevent="productSubmitForm">
          <fieldset>
            <legend>Product store</legend>
            <label>Product Name:</label><br /><input
              type="text"
              v-model="product.productName"
            /><br /><label>Image Describing:</label><br /><input
              type="text"
              v-model="product.photo"
            /><br /><label>Category:</label><br /><input
              type="text"
              v-model="product.category"
            /><br /><label>Source:</label><br /><select
              v-model="product.source"
            >
              <option value="">Select...</option>
              <option value="Consignment">CONSIGNMENT</option>
              <option value="Purchases">PURCHASES</option></select
            ><br /><label>Introduced On:</label><br /><input
              type="date"
              v-model="product.introducedOn"
            /><br /><label>Retail Price:</label><br /><input
              type="number"
              v-model="product.retailPrice"
            /><br /><label>Units Purchased:</label><br /><input
              type="number"
              v-model="product.unitsPurchased"
            /><br /><label>Value Purchased:</label><br /><input
              type="number"
              v-model="product.valuePurchased"
            /><br /><label>Units Sold:</label><br /><input
              type="number"
              v-model="product.unitsSold"
            /><br /><label>Value Sold:</label><br /><input
              type="number"
              v-model="product.valueSold"
            /><br /><label>Units Instock:</label><br /><input
              type="number"
              v-model="product.unitsInstock"
            /><br /><label>Value Instock:</label><br /><input
              type="number"
              v-model="product.valueInstock"
            /><br /><label>Sales Cost:</label><br /><input
              type="number"
              v-model="product.salesCost"
            /><br /><label>Gross Profit:</label><br /><input
              type="number"
              v-model="product.grossProfit"
            /><br /><label>Discontinue:</label><br />
            <h6>NO</h6>
            <input
              type="radio"
              v-model="product.discontinue"
              value="NO"
            />
            <h6>YES</h6>
            <input type="radio" v-model="product.discontinue" value="YES" />
            <br /><br />
            <button class="btn btn-success submit" type="submit">Save</button>
            <p><span id="message"></span></p>
          </fieldset>
        </form>
      </div>
      <div id="customer" class="container tab-pane">
        <br />
        <!-- CUSTOMER INFO -->
        <form @submit.prevent="customerSubmitForm">
          <fieldset>
            <legend>Customer</legend>
            <label>Name:</label><br /><input
              type="text"
              v-model="customer.customerName"
            /><br /><label>Country:</label><br /><input
              type="text"
              v-model="customer.country"
            /><br /><label>City/Town:</label><br /><input
              type="text"
              v-model="customer.city"
            /><br /><label>Street:</label><br /><input
              type="text"
              v-model="customer.street"
            /><br /><label>Address:</label><br /><input
              type="text"
              v-model="customer.address"
            /><br /><label>Telephone:</label><br /><input
              type="text"
              v-model="customer.telephone"
            /><br /><label>Email:</label><br /><input
              type="email"
              v-model="customer.email"
            /><br /><label>Website:</label><br /><input
              type="url"
              v-model="customer.website"
            />
            <br /><br />
            <button class="btn btn-success submit" type="submit">Save</button>
            <p></p>
          </fieldset>
        </form>
      </div>
      <div id="sale" class="container tab-pane active">
        <br />
        <!-- CONSUMER DETAILS -->
        <form @submit="saleSubmitForm">
          <fieldset>
            <select class="catalog" id="catalogue">
              <option value="">Find your favourites by Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="gaming">Gaming</option>
              <option value="home">Home</option>
              <option value="machines">Machines</option>
            </select>
            <div id="list-items"></div>
            <br />
            <legend>Point of Sale</legend>
            <label>Select item to add to cart:</label><br />
            <select v-model="sale.productName">
              <option
                v-for="product in productList"
                :key="product.id"
                :value="product.productName"
              >
                {{ product.productName }} Ugx. {{ product.retailPrice }}
              </option></select
            ><br />
            <label>Order By:</label><br /><input
              type="text"
              v-model="sale.orderBy"
            /><br />
            <label>Units Sold:</label><br /><input
              type="number"
              v-model="sale.unitsSold"
            /><br />
            <label>Unit Price:</label><br /><input
              type="number"
              v-model="sale.unitPrice"
            /><br />
            <label>Total Price:</label><br /><input
              type="number"
              v-model="sale.totalPrice"
              readonly
            /><br />
            <label>Note:</label><br />
            <input type="text" v-model="sale.note" />
            <br /><br /><button
              class="btn btn-success submit"
              type="submit"
              onclick="addItem()"
            >
              + Add Item To Cart <img src="cart.png" />
            </button>
            <br />
            <span id="message-"></span><br /><label>Count of added item.</label
            ><input
              class="btn btn-white"
              id="addeditems"
              type="button"
            /><br /><label>Cumulative Cost Ugx.</label
            ><input class="btn btn-white" id="cumulativeValue" type="button" />
          </fieldset>
        </form>
      </div>
      <div id="account" class="container tab-pane">
        <br />
        <!-- ACCOUNT -->
        <form @submit.prevent="accountSubmitForm">
          <fieldset>
            <legend>Account</legend>
            <label>Account Name</label><br />
            <select v-model="account.accountName">
              <option
                v-for="account in accountList"
                :key="account.id"
                :value="account.accountName"
              >
                {{ account.accountName }}
              </option>
            </select>
            <br />
            <label>Amount</label><br />
            <input type="text" v-model="account.amount" /><br />
            <label>Note</label><br />
            <input type="text" v-model="account.note" /><br /><br />
            <button class="btn btn-success" type="submit">Save</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, computed } from 'vue';
import HeaderSection from '@/components/HeaderSection.vue';
import api from '../api';

export default {
  name: 'create_entity',
  components: {
    HeaderSection,
  },
  data() {
    return {
      supplier: {},
      product: {},
      productList: [],
      customer: {},
      account: {},
      accountList: [
        { accountName: 'Carriage inwards/outwards' },
        { accountName: 'Cash withdrawn for own use' },
        { accountName: 'Depreciation of fixed asset' },
        { accountName: 'Expense accrued' },
        { accountName: 'Expense pre-paid' },
        { accountName: 'Fixed asset acquired' },
        { accountName: 'Loan acquired' },
        { accountName: 'Loan paid' },
        { accountName: 'Owner Equity' },
        { accountName: 'Other payment' },
        { accountName: 'Dividend' },
        { accountName: 'Service rendered at cost' },
        { accountName: 'Shares' },
      ],
    };
  },
  setup() {
    const purchase = reactive({
      totalCost: computed(() => purchase.unitsPurchased * purchase.unitCost),
    });

    const sale = reactive({
      totalPrice: computed(() => sale.unitsSold * sale.unitPrice),
    });

    return { purchase, sale };
  },
  // List Products
  created() {
    const endpoint = '/products';
    axios
      .get(api + endpoint)
      .then((res) => {
        this.productList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  // METHODS
  methods: {
    // SUPPLIER
    async supplierSubmitForm() {
      const endpoint = '/suppliers';
      try {
        await axios.post(api + endpoint, this.supplier);
        // Reset fields
        this.supplier = {
          supplierName: '',
          country: '',
          city: '',
          street: '',
          address: '',
          telephone: '',
          email: '',
          website: '',
        };
        this.message = 'Supplier Added.';
      } catch {
        this.message = 'Unsuccessful! Please Try Again.';
      }
    },
    // PURCHASE
    async purchaseSubmitForm() {
      const endpoint = '/purchases';
      try {
        await axios.post(api + endpoint, this.purchase);
        // Reset fields
        this.purchase = {
          unitsPurchased: '',
          unitCost: '',
          totalCost: '',
          note: '',
        };
        this.message = 'Purchase Added.';
      } catch {
        this.message = 'Unsuccessful! Please Try Again.';
      }
    },
    // PRODUCT
    async productSubmitForm() {
      const endpoint = '/products';
      try {
        await axios.post(api + endpoint, this.product);
        // Reset fields
        this.product = {
          productName: '',
          photo: '',
          category: '',
          source: '',
          introducedOn: '',
          retailPrice: '',
          unitsPurchased: '',
          valuePurchased: '',
          unitsSold: '',
          valueSold: '',
          unitsInstock: '',
          valueInstock: '',
          salesCost: '',
          grossProfit: '',
          discontinue: '',
        };
        this.message = 'Product Added.';
      } catch {
        this.message = 'Unsuccessful! Please Try Again.';
      }
    },
    // CUSTOMER
    async customerSubmitForm() {
      const endpoint = '/customers';
      try {
        await axios.post(api + endpoint, this.customer);
        // Reset fields
        this.customer = {
          customerName: '',
          country: '',
          city: '',
          street: '',
          address: '',
          telephone: '',
          email: '',
          website: '',
        };
        this.message = 'Customer Added.';
      } catch {
        this.message = 'Unsuccessful! Please Try Again.';
      }
    },
    // SALE
    async saleSubmitForm() {
      const endpoint = '/sales';
      try {
        await axios.post(api + endpoint, this.sale);
        // Reset fields
        this.sale = {
          orderBy: '',
          productName: '',
          unitsSold: '',
          unitPrice: '',
          totalPrice: '',
          note: '',
        };
        this.message = 'Sale Added.';
      } catch {
        this.message = 'Unsuccessful! Please Try Again.';
      }
    },
    // ACCOUNT
    async accountSubmitForm() {
      const endpoint = '/accounts';
      try {
        await axios.post(api + endpoint, this.account);
        // Reset fields
        this.account = {
          accountName: '',
          amount: '',
          note: '',
        };
        this.message = 'Account Added.';
      } catch {
        this.message = 'Unsuccessful! Please Try Again.';
      }
    },
  },
};
</script>
