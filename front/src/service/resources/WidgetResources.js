import axios from "axios";

export default class Resources {
    axios = require("axios");
    hostname = window.location.hostname;
    API_KEY = "ee95de4f37a7e21b3714e529ea39a2fb";

    getPrintedWidgets(params) {
        const url = `${process.env.VUE_APP_BACK_URL}`;
        return axios.get(url, {params: params});
    }

    getMeteo(params) {
        const url = `https://api.openweathermap.org/data/2.5/onecall?appid=${this.API_KEY}`;
        return axios.get(url, {params: params});
    }

    getTodayMeteo(params) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${this.API_KEY}`;
        return axios.get(url, {params: params});
    }

    getOrientation() {
        const url = `http://${this.hostname}:3000/admin/orientation`;
        return axios.get(url);
    }

    async getNews() {
        const url = `http://${this.hostname}:3000/parse/`;
        return axios
            .post(url, {url: "https://www.france24.com/fr/rss"})
            .then((response) => response.data)
            .catch((error) => error);
    }
}