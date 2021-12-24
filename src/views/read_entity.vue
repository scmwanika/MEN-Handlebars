<template>
  <div class="content">
    <HeaderSection />
    <h4>read entity</h4>
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
        <table
          class="table table-info"
          v-for="supplier in supplierList"
          :key="supplier.id"
        >
          <tr>
            <td>Supplier:</td>
            <th>{{ supplier.supplierName }}</th>
          </tr>
          <tr>
            <td>Country:</td>
            <th>{{ supplier.country }}</th>
          </tr>
          <tr>
            <td>City:</td>
            <th>{{ supplier.city }}</th>
          </tr>
          <tr>
            <td>Street:</td>
            <th>{{ supplier.street }}</th>
          </tr>
          <tr>
            <td>Address:</td>
            <th>{{ supplier.address }}</th>
          </tr>
          <tr>
            <td>Telephone:</td>
            <th>{{ supplier.telephone }}</th>
          </tr>
          <tr>
            <td>Email:</td>
            <th>{{ supplier.email }}</th>
          </tr>
          <tr>
            <td>Website:</td>
            <th>{{ supplier.website }}</th>
          </tr>
          <br />
        </table>
      </div>
      <div id="purchase" class="container tab-pane">
        <br />
        <!-- SUPPLY DETAILS -->
        <table
          class="table table-info"
          v-for="purchase in purchaseList"
          :key="purchase.id"
        >
          <tr>
            <td>Units Purchased:</td>
            <th>{{ purchase.unitsPurchased }}</th>
          </tr>
          <tr>
            <td>Unit Cost:</td>
            <th>{{ purchase.unitCost }}</th>
          </tr>
          <tr>
            <td>Total Cost:</td>
            <th>{{ purchase.totalCost }}</th>
          </tr>
          <tr>
            <td>Note:</td>
            <th>{{ purchase.note }}</th>
          </tr>
          <br />
        </table>
      </div>
      <div id="product" class="container tab-pane">
        <br />
        <!-- STOCK COUNT -->
        <table
          class="table"
          v-for="product in productList"
          :key="product.id"
        >
          <tr>
            <td>Product:</td>
            <th>{{ product.productName }}</th>
          </tr>
          <tr>
            <td>Photo:</td>
            <th>{{ product.photo }}</th>
          </tr>
          <tr>
            <td>Category:</td>
            <th>{{ product.category }}</th>
          </tr>
          <tr>
            <td>Source:</td>
            <th>{{ product.source }}</th>
          </tr>
          <tr>
            <td>Date Introduced:</td>
            <th>{{ product.introducedOn }}</th>
          </tr>
          <tr>
            <td>Retail Price:</td>
            <th>{{ product.retailPrice }}</th>
          </tr>
          <tr>
            <td>Units Purchased:</td>
            <th>{{ product.unitsPurchased }}</th>
          </tr>
          <tr>
            <td>Value Purchased:</td>
            <th>{{ product.valuePurchased }}</th>
          </tr>
          <tr>
            <td>Units Sold:</td>
            <th>{{ product.unitsSold }}</th>
          </tr>
          <tr>
            <td>Value Sold:</td>
            <th>{{ product.valueSold }}</th>
          </tr>
          <tr>
            <td>Units Instock:</td>
            <th>{{ product.unitsInstock }}</th>
          </tr>
          <tr>
            <td>Value Instock:</td>
            <th>{{ product.valueInstock }}</th>
          </tr>
          <tr>
            <td>Sales Cost:</td>
            <th>{{ product.salesCost }}</th>
          </tr>
          <tr>
            <td>Gross Profit:</td>
            <th>{{ product.grossProfit }}</th>
          </tr>
          <tr>
            <td>Discontinue:</td>
            <th>{{ product.discontinue }}</th>
          </tr>
          <tr>
            <td></td>
            <th>
              <!-- edit product -->
              <router-link
                :to="{ name: '', params: { id: product.id } }"
                class="edit"
              >
                edit
              </router-link>
              <!-- delete product -->
              <a href="" @click="removeProduct(product.id)"> delete </a>
            </th>
          </tr>
          <br />
        </table>
      </div>
      <div id="customer" class="container tab-pane">
        <br />
        <!-- CUSTOMER INFO -->
        <table
          class="table table-info"
          v-for="customer in customerList"
          :key="customer.id"
        >
          <tr>
            <td>Customer:</td>
            <th>{{ customer.customerName }}</th>
          </tr>
          <tr>
            <td>Country:</td>
            <th>{{ customer.country }}</th>
          </tr>
          <tr>
            <td>City:</td>
            <th>{{ customer.city }}</th>
          </tr>
          <tr>
            <td>Street:</td>
            <th>{{ customer.street }}</th>
          </tr>
          <tr>
            <td>Address:</td>
            <th>{{ customer.address }}</th>
          </tr>
          <tr>
            <td>Telephone:</td>
            <th>{{ customer.telephone }}</th>
          </tr>
          <tr>
            <td>Email:</td>
            <th>{{ customer.email }}</th>
          </tr>
          <tr>
            <td>Website:</td>
            <th>{{ customer.website }}</th>
          </tr>
          <br />
        </table>
      </div>
      <div id="sale" class="container tab-pane active">
        <br />
        <!-- CONSUMER DETAILS -->
        <table class="table table-info" v-for="sale in saleList" :key="sale.id">
          <tr>
            <td>Order By:</td>
            <th>{{ sale.orderBy }}</th>
          </tr>
          <tr>
            <td>Product:</td>
            <th>{{ sale.productName }}</th>
          </tr>
          <tr>
            <td>Units Sold:</td>
            <th>{{ sale.unitsSold }}</th>
          </tr>
          <tr>
            <td>Unit Price:</td>
            <th>{{ sale.unitPrice }}</th>
          </tr>
          <tr>
            <td>Total Price:</td>
            <th>{{ sale.totalPrice }}</th>
          </tr>
          <tr>
            <td>Note:</td>
            <th>{{ sale.note }}</th>
          </tr>
          <br />
        </table>
      </div>
      <div id="account" class="container tab-pane">
        <br />
        <!-- ACCOUNT -->
        <table
          class="table table-info"
          v-for="account in accountList"
          :key="account.id"
        >
          <tr>
            <td>Account:</td>
            <th>{{ account.accountName }}</th>
          </tr>
          <tr>
            <td>Guest:</td>
            <th>{{ account.amount }}</th>
          </tr>
          <tr>
            <td>Rated:</td>
            <th>{{ account.note }}</th>
          </tr>
          <br />
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderSection from '@/components/HeaderSection.vue';
import api from '../api';

export default {
  name: 'read_entity',
  components: {
    HeaderSection,
  },
  data() {
    return {
      supplierList: [],
      purchaseList: [],
      productList: [],
      customerList: [],
      saleList: [],
      accountList: [],
    };
  },
  created() {
    // List Suppliers
    axios
      .get(`${api}/suppliers`)
      .then((res) => {
        this.supplierList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // List Purchases
    axios
      .get(`${api}/purchases`)
      .then((res) => {
        this.purchaseList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // List Products
    axios
      .get(`${api}/products`)
      .then((res) => {
        this.productList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // List Customers
    axios
      .get(`${api}/customers`)
      .then((res) => {
        this.customerList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // List Sales
    axios
      .get(`${api}/sales`)
      .then((res) => {
        this.saleList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });

    // List Accounts
    axios
      .get(`${api}/accounts`)
      .then((res) => {
        this.accountList = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
td {
  width: 125px;
  text-align: justify;
  background-color: skyblue;
}

th {
  text-align: justify;
}

.edit {
  background-color: none;
}
</style>
