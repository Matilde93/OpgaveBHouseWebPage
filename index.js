const baseURI = "https://resthouseexam.azurewebsites.net/api/Houses";

Vue.createApp({
  data() {
    return {
      house: "",
      houses: [],
    };
  },
  async created() {
    console.log("created method called");
    this.GetAll();
  },
  methods: {
    async GetAll() {
      try {
        const response = await axios.get(baseURI);
        this.houses = await response.data;
        this.error = null;
      } catch (e) {
        this.houses = [];
        this.error = e.message;
      }
    },
    async AddHouse(id, address, constructionYear) {
      id = 0;
      const newHouse = {
        id: id,
        address: address,
        constructionYear: constructionYear,
      };
      try {
        response = await axios.post(baseURI, newHouse);
        this.houses = await response.data;
        this.GetAll();
      } catch (ex) {
        alert(ex.message);
      }
    },
    async DeleteHouse(id) {
      try {
        response = await axios.delete(baseURI + "/" + id);
        this.houses = await response.data;
        this.GetAll();
      } catch (ex) {
        alert(ex.message);
      }
    },
    async SearchHouse(address) {
      const result = this.houses.filter(
        (house) => house.address.toLowerCase().includes(address.toLowerCase())
      );
      this.houses = result;
    },
    async ShowAll() {
      this.GetAll()
    },
    sortByAddress() {
      this.houses.sort((item1, item2) =>
        item1.address.localeCompare(item2.address)
      );
    },
    sortByAddressDe() {
      this.houses.sort((item1, item2) =>
        item2.address.localeCompare(item1.address)
      );
    },
    sortByYearAscending() {
      this.houses.sort((item1, item2) => item1.constructionYear - item2.constructionYear);
    },
    sortByYEarDescending() {
      this.houses.sort((item1, item2) => item2.constructionYear - item1.constructionYear);
    },
  },
}).mount("#app");
