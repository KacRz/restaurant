<template>
    <div class="settings">
        <div class="settings-user">
            <div class="edit-user">
                <h2>Dane konta</h2>
                <div class="edit" v-on:click="edituser=!edituser">
                    <i class="fas fa-edit"></i>
                </div>
            </div>
            <div class="content">
                <span class="title">Imię</span>
                <span class="data" v-if="edituser"> {{ AccountData.Firstname }} </span>
                <input type="text" v-else class="data-input" :value="AccountData.Firstname" name="newfirstname"/>
            </div>
            <div class="content">
                <span class="title">Nazwisko</span>
                <span class="data" v-if="edituser"> {{ AccountData.Lastname }} </span>
                <input type="text" v-else class="data-input" :value="AccountData.Lastname" name="newlastname"/>
            </div>
            <div class="content">
                <span class="title">Email</span>
                <span class="data" > {{ AccountData.Email }} </span>
            </div>
            <div class="content" v-if="!edituser">
                <button class="address-btn" v-on:click="changeData">Zmień dane</button>
            </div>
        </div>
        <div class="change-password">
            <div class="change-password__title" v-on:click="isResetPassword=!isResetPassword">
                <h3>Zmień hasło</h3>
                <i class="fas fa-unlock-alt"></i>
            </div>
            <form v-if="isResetPassword"
            @submit.prevent = "resetPasswordForm" 
            method="post"
            class="reset-pass">
                <div class="one-password">
                    <span>Stare hasło</span>
                    <input type="password" v-model="oldPassword"/>
                </div>
                <div class="one-password">
                    <span>Nowe hasło</span>
                    <input type="password" v-model="newPassword"/>
                </div>
                <button class="address-btn" type="submit">Zmień hasło</button>
            </form>
        </div>
        <div class="restaurant-settings" v-if="isStaff">
            <div class="restaurant-settings__title">
                <h2>Informacje o restauracji</h2>
                <div class="icon" v-on:click="isAddNewInfo = !isAddNewInfo">
                    <i class="fas fa-plus-circle "></i>
                </div>
            </div>
            <div class="one-info" v-if="isAddNewInfo">
                <div class="info-type">
                    <select id="newInfoType" v-model="newInfoType">
                        <option value="Telefon">Telefon</option>
                        <option value="Lokalizacja">Lokalizacja</option>
                        <option value="Godziny">Godziny</option>
                    </select>
                </div>
                <div class="info-value">
                    <input type="text" v-model="newInfoValue"/>
                </div>
                <button v-on:click="addNewInfo" class="btn">Dodaj</button>
            </div>
            <div class="one-info" v-for="info in restaurantinfo" :key="info.id">
                <div class="info-type">
                    {{ info.type }}
                </div>
                <div class="info-value">
                    {{ info.value }}
                </div>
                <div class="delete-info" v-on:click="deleteInfo(info.id)">
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>
        <div class="settings-address">
            <h2>Adresy</h2>
            <div class="one-address" v-for="(adres, index) in AddressList" :key="index">
                <span>
                    {{ adres.City }}
                </span>
                <span>
                    {{ adres.Street }} {{ adres.HouseNumber }}
                </span>
                <span>
                    {{ adres.PostalCode }}
                </span>
                <div class="delete-address" v-on:click="deleteOneAddress(adres.id)">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
            <div class="add-address" v-if="!addAddress" v-on:click="addAddress = !addAddress">
                Dodaj adres <i class="fas fa-plus-circle"></i>
            </div>
            <form @submit.prevent = "checkForm" method="post" class="add-address__form" v-else>
                <span>Miasto</span><input type="text" v-model="newAddress.newCity" placeholder="Miasto" required/>
                <span>Ulica</span><input type="text" v-model="newAddress.newStreet" placeholder="Ulica" required/>
                <span>Nr domu/mieszkania</span><input type="text" v-model="newAddress.newHouseNumber" placeholder="Nr domu/mieszkania" required/>
                <span>Kod pocztowy</span><input type="text" maxlength="6" v-model="newAddress.newPostalCode" placeholder="Kod pocztowy (xx-xxx)" required/>
                <button type="submit" class="address-btn">Dodaj adres</button>
            </form>
        </div>
    </div>
</template>

<script>
import Service from '../Service/Service';

export default {
    name: "Settings",
    data() {
        return {
            AccountData: { 
                firstname: '',
                lastname: '',
                email: ''
            },
            AddressList: [  ],
            addAddress: false,
            newAddress: {
                newCity: '',
                newStreet: '',
                newHouseNumber: '',
                newPostalCode: ''
            },
            edituser: true,
            restaurantinfo: [],
            isAddNewInfo: false,
            newInfoValue: '',
            newInfoType: '',
            isResetPassword: false,
            oldPassword: '',
            newPassword: ''
        }
    },
    async created() {
        this.AddressList = this.$store.getters['user/getAddresses'];
        this.AccountData = this.$store.getters['user/getAccountData'];
        this.loadInfos();
    },
    computed: {
        isClient()
        {
            return (this.$store.getters['user/getMode'] == 'Guest' || this.$store.getters['user/getMode'] == 'Klient')
        },
        isStaff()
        {
            return (this.$store.getters['user/getMode'] == 'Obsługa' || this.$store.getters['user/getMode'] == 'Kierownik')
        },
    },
    methods: {
        async resetPasswordForm() {
            if (this.oldPassword == '' || this.newPassword == '') {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Wprowadź dane</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
                return false;
            }
            let temp = await Service.changePassword(this.$store.getters['user/getEmail'], this.oldPassword, this.newPassword);
            if (temp.status == '200') {
                this.isResetPassword = false;
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Zmieniono hasło</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                });
                return true;
            }
            else {
                this.isResetPassword = false;
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Wystąpił błąd</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
                return false;
            }
        },
        async loadInfos() {
            this.restaurantinfo = [];
            const temp = await Service.getRestaurantInfo();
            Array.prototype.push.apply(this.restaurantinfo.sort(), temp.data);
            this.restaurantinfo.sort(this.dynamicSort("type"));
        },
        async deleteInfo(id) {
            await Service.deleteRestaurantInfo(id);
            this.loadInfos();
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Usunięto informację</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                });
        },
        async addNewInfo() {
            if (this.newInfoType == '' || this.newInfoValue == '') {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Podaj wszystkie dane</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'error'
                });
                return false;
            }await Service.addNewRestaurantInfo(this.newInfoType, this.newInfoValue);
            this.loadInfos();
            this.isAddNewInfo = false;
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Dodano nową informację</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                });
        },
        async checkForm() {
            if (this.newAddress.newPostalCode) {
                if (!this.validPostalcode(this.newAddress.newPostalCode)){
                    this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Podaj prawidłowy kod-pocztowy</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '20rem',
                    icon: 'error'
                });
                    return false;
                }
            }
            if (!this.newAddress) {
                    this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Podaj wszystkie dane</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '20rem',
                    icon: 'error'
                });
                    return false;
                }
            // dodawanie nowego adresu
            await Service.addNewAddress(this.$store.getters['user/getToken'], this.$store.getters['user/getEmail'], this.newAddress);
            const tmp2 = await Service.getAddresses(this.$store.getters['user/getEmail']);
            this.$store.dispatch('user/setAddress', tmp2.data);
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Dodano adres</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    icon: 'success',
                    confirmButtonColor: 'green'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.go();
                    }
                });
        },
        validPostalcode(postalcode) {
            let re = /^(([0-9]{2}-[0-9]{3}))$/;
            return re.test(postalcode);
        },
        async changeData() {
            const newfirstname = document.querySelector("input[name=newfirstname]").value;
            const newlastname = document.querySelector("input[name=newlastname]").value;

            if (newfirstname == '' || newlastname == '') {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Wystąpił błąd</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '20rem',
                    icon: 'error'
                });
                return false;
            }

            const newData = {
                firstname: newfirstname,
                lastname: newlastname,
            }
            await Service.updateUserData(this.$store.getters['user/getToken'], newData, this.$store.getters['user/getEmail']);
            
            const temp = await Service.getUserData(this.$store.getters['user/getToken'], this.$store.getters['user/getEmail']);
            this.$store.dispatch('user/updateData', temp.data);
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Zmieniono dane konta</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    icon: 'success',
                    confirmButtonColor: 'green'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.go();
                    }
                });

        },
        async deleteOneAddress(adresid) {
            if (this.AddressList.length == 1) {
                this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Nie można usunąć jedynego adresu</h3></center>',
                    timer: 1500,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'info'
                });
                return false;
            }
            await Service.deleteAddress(this.$store.getters['user/getToken'], adresid);
            const tmp2 = await Service.getAddresses(this.$store.getters['user/getEmail']);
            this.$store.dispatch('user/setAddress', tmp2.data);
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Usunięto adres</h3></center>',
                    position: 'center',
                    background: '#1b1b1b',
                    icon: 'success',
                    confirmButtonColor: 'green'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.go();
                    }
                });
        },
        dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                /* next line works with strings and numbers, 
                * and you may want to customize it to your needs
                */
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        },
    }
}
</script>

<style scoped>
.settings {
    width: 100%;
    color: rgb(255, 205, 124);;
    background-color: #1b1b1b;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.change-password {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.change-password__title {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
}
.change-password__title > h3 {
    margin-right: 0.5em;
}
.change-password__title:hover {
    cursor: pointer;
    color: chocolate;
}
.reset-pass {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.one-password {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0.5em;
    align-items: center;
}
.one-password > span {
    width: 30%;
}
.one-password > input {
    width: 70%;
}

.restaurant-settings {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.restaurant-settings__title {
    display: flex;
    justify-content: center;
    align-items: center;
}
.delete-info {
    transition: 0.5s;
}
.delete-info:hover {
    color: red;
}
.btn {
    background-color: green;
    border: none;
    border-radius: 5px;
    padding: 0.5em;
    color: white;
    transition: 0.5s;
}
.btn:hover {
    cursor: pointer;
    background-color: lightgreen;
    color: black;
}

.one-info {
    width: 60%;
    margin: 0.3em 0;
    font-size: 1.1rem;
    box-sizing: border-box;
    display: flex;
    padding: 0.3em;
    align-items: center;
}
.info-type {
    width: 30%;
}
.info-value {
    width: 70%;
}
.one-info:hover {
    background-color: #2b2b2b;
    cursor: pointer;
}
.info-value > input {
    width: 70%;
}
.settings-address {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 1em;
}
.one-address {
    font-size: 1.5em;
    width: 30%;
    margin-bottom: 1em;
    padding: 0.5em;
    border: 1px solid rgb(255, 205, 124);
    position: relative;
}
.one-address > span {
    width: 100%;
    word-wrap: break-word;
    display: block;
    text-align: left;
}
.icon {
    margin-left: 0.5em;
    transition: 0.5s;
}
.icon:hover {
    cursor: pointer;
    color: green;
}
.add-address {
    font-size: 1.5em;
    color: rgb(255, 205, 124);
    transition: 0.5s;
    border-radius: 5px;
    padding: 0.3em;
}
.add-address:hover {
    cursor: pointer;
    background-color: rgb(255, 205, 124);
    color: #1b1b1b;
}
.add-address__form {
    width: 50%;
    border: 1px solid rgb(255, 205, 124);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.3em;
}
.add-address__form > input {
    width: 60%;
    margin: 0.3em;
    font-size: 1.3em;
}
.address-btn {
    background-color: green;
    border: none;
    border-radius: 5px;
    padding: 0.5em;
    color: white;
    transition: 0.5s;
}
.address-btn:hover {
    cursor: pointer;
    background-color: lightgreen;
    color: black;
}
.edit-user {
    display: flex;
    justify-content: center;
    align-items: center;
}
.settings-user {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}
.settings-data {
    margin-top: 1em;
    width: 100%;
}
.content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 50%;

    font-size: 1.5em;
    margin-bottom: 0.5em;
}
.title {
    width: 30%;
    text-align: left;
}
.data {
    width: 70%;
    text-align: left;
}
.edit {
    margin-left: 1em;
}
.edit:hover {
    cursor: pointer;
}
.data-input {
    width: 70%;
    text-align: left;
    font-size: 1.1em;
}
.delete-address {
    position: absolute;
    top: 5px;
    right: 10px;
    transition: 0.5s;
}
.delete-address:hover {
    color: red;
    cursor: pointer;
}

@media (max-width: 750px) {
    .content {
        width: 80%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 1em;
    }
    .title {
        width: 100%;
        text-align: center;
        font-weight: bold;
    }
    .data {
        width: 100%;
        text-align: center;
    }
    .one-address {
        font-size: 1em;
        width: 50%;
    }
    .add-address__form > input {
    font-size: 0.8em;
    }
    .one-info {
        font-size: 0.8rem;
    }
    .reset-pass {
        width: 90%;
    }
}

</style>