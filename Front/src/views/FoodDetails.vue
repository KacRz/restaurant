<template>
  <div class="addto-cart" v-if="!isStaff()">
      <div class="addto-cart__info">
            <router-link to="/menu" class="addto-cart__exit">
                <i class="fas fa-times-circle"></i>
            </router-link>
          <span class="addto-cart__number"> {{ details.Foodnumber }} </span>
          <div class="addto-cart__title">
            <h1>{{ details.Title }}</h1>
          </div>
          <div class="addto-cart__info-content">
              <div class="addto-cart__info-content-img">
                <img v-bind:src="details.imgsource" />
              </div>
              <div class="addto-cart__info-content-description">
                <p>
                    {{ details.Description }}
                </p>
                <div class="addto-cart__price">
                   Cena: {{ details.Price }}zł
                </div>
              </div>
          </div>
      </div>
    <div >
      <div class="addto-cart__bottom">
          <div class="addto-cart__delete-button" v-on:click="removeItem">
              <span>Usuń z koszyka</span><i class="fas fa-trash-alt"></i>
          </div>
          <div class="addto-cart__add-button" v-on:click="addToCart">
              <span>Dodaj do koszyka</span><i class="fas fa-cart-plus" />
          </div>
      </div>
    </div>
    <div class="rating">
        <div class="rating-stars">
            <span :class="{ isNoRatings: isNoRatings }">Ocena użytkowników: </span>
            <div class="star" v-for="(star, index) in Math.floor(ratingInStars)" :key="index" :class="{ isNoRatings: isNoRatings }">
                <i class="fas fa-star"></i>
            </div>
            <div class="star" v-if="isHalfStar" :class="{ isNoRatings: isNoRatings }">
                <i class="fas fa-star-half-alt"></i>
            </div>
            <div class="star" v-for="(star, index) in Math.floor(5 - ratingInStars)" :key="index" :class="{ isNoRatings: isNoRatings }">
                <i class="far fa-star"></i>
            </div>
            <div v-if="Rating == 0" class="no-ratings">
                <span>Brak ocen</span>
            </div>
        </div>
        <div class="add-rating" v-if="logged">
            <span>Dodaj swoją ocenę</span>
            <div class="add-rating">
                <div class="add-rating__stars">
                    <div class="add-rating__star" v-if="userRating < 1" v-on:click="userRating = 1">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-else v-on:click="userRating = 1">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-if="userRating < 2" v-on:click="userRating = 2">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-else v-on:click="userRating = 2">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-if="userRating < 3" v-on:click="userRating = 3">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-else v-on:click="userRating = 3">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-if="userRating < 4" v-on:click="userRating = 4">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-else v-on:click="userRating = 4">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-if="userRating < 5" v-on:click="userRating = 5">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="add-rating__star" v-else v-on:click="userRating = 5">
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <textarea v-model="comment" placeholder="Dodaj kometarz do dania" rows="4" cols="50" class="comment" maxlength="200" />
                <button class="btn" v-on:click="addRating">Dodaj ocenę</button>
            </div>
        </div>
        <div class="all-ratings" v-if="allRatingsList.length != 0">
            <h4>Wszystkie oceny:</h4>
            <div v-for="item in allRatingsList" :key="item.id" class="all-ratings__item">
                <span class="item">{{ item.User.firstname }}</span>
                <div class="see-rating__stars">
                    <div class="see-rating__star" v-if="item.Rating < 1">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-else>
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-if="item.Rating < 2">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-else>
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-if="item.Rating < 3">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-else>
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-if="item.Rating < 4">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-else>
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-if="item.Rating < 5">
                        <i class="far fa-star"></i>
                    </div>
                    <div class="see-rating__star" v-else>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                <div class="see-comment item">
                    {{ item.Comment }}
                </div>
            </div>
        </div>
    </div>
</div>
<div class="addto-cart" v-else>
  <div class="addto-cart__info">
      <router-link to="/menu" class="addto-cart__exit">
          <i class="fas fa-times-circle"></i>
      </router-link>
      <span class="addto-cart__number"> {{ details.Foodnumber }} </span>
        <div class="addto-cart__title">
          <h1 class="field-value" v-show="!showField('Title')" @click="focusField('Title')">{{details.Title}}</h1>
          <input v-model="details.Title" v-show="showField('Title')" id="dish-Title" type="text" class="field-value form-control" @focus="focusField('Title')" @blur="blurField">    
        </div>
        <div class="addto-cart__info-content">
            <div class="addto-cart__info-content-img">
              <img v-bind:src="details.imgsource" />
            </div>
            <div class="addto-cart__info-content-description">
              
                <p class="field-value" v-show="!showField('Description')" @click="focusField('Description')">{{details.Description}}</p>
                <input v-model="details.Description" v-show="showField('Description')" id="dish-Description" type="text" class="field-value form-control" @focus="focusField('Description')" @blur="blurField">
              <div>
                  <p class="field-value" v-show="!showField('Price')" @click="focusField('Price')">
                 Cena: {{ details.Price }}zł</p>
                <input v-model="details.Price" v-show="showField('Price')" id="dish-Price" type="text" class="field-value form-control" @focus="focusField('Price')" @blur="blurField">
              </div>
                <h4>
                    Dostępny: {{details.isAvalilable? "Tak": "Nie"}}<br>
                    Danie dania: {{details.IsDishOfDay? "Tak": "Nie"}}
                </h4>
            </div>
            <div class = "fields-aval-dishofday">

            </div>
        </div>
    </div>
  <div >
    <div class="addto-cart__bottom">
        <div class="addto-cart__dishofday-button" v-on:click="saveChanges">
            <span>Zapisz zmiany </span><i class="far fa-save" />
        </div>
        <div class="addto-cart__add-button" v-on:click="undoChanges">
            <span>Cofnij zmiany </span><i class="fas fa-undo-alt" />
        </div>
        <div class="addto-cart__delete-button" v-on:click="changeAvailable">
            <span>Ustaw dostępne </span><i class="fas fa-ban"></i>
        </div>
        <div class="addto-cart__dishofday-button" v-on:click="setDishOfDay">
            <span>Danie dnia </span><i class="fab fa-hotjar" />
        </div>
    </div>
  </div>
</div>
</template>

<script>
import StaffService from '../Service/StaffService'
import Service from '../Service/Service'
export default {
    name: "FoodDetails",
    data() {
        return {
            isEditing: false,
            modals: [ ],
            editField: '',
            details: this.$route.params,
            changed: {
            Price: 0,
            Title: '',
            Description: '',
            isAvalilable:'',
            IsDishOfDay: '',
            },
            Rating: 0,
            userRating: 5,
            comment: '',
            isNoRatings: false,
            allRatingsList: [  ]
        }
        
    },
    methods: {
        addToCart() {
            this.$store.dispatch("cart/addToCart", this.details);
            this.$swal({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">Dodano do koszyka</h3></center>',
                    timer: 1000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
                });
        },
        removeItem() {
            this.$store.dispatch("cart/removeItem", this.details);
        },
        isStaff()
        {
            return this.$store.getters['user/isStaff'];
        },
        changeAvailable()
        {
            if(this.changed.isAvalilable === '')
            {

                this.changed.isAvalilable = Boolean(parseInt(this.details.isAvalilable));
                this.details.isAvalilable = Boolean(parseInt(this.details.isAvalilable));
            }
            this.details.isAvalilable = !this.details.isAvalilable;
        },
        undoChanges()
        {
            if(this.changed.Title !== '')
            {
                this.details.Title = this.changed.Title;
            }
            if(this.changed.Description !== '')
            {
                this.details.Description = this.changed.Description;
            }
            if(this.changed.Price !== 0)
            {
                this.details.Price = this.changed.Price;
            }
            if(this.changed.isAvalilable !== '')
            {
                this.details.isAvalilable = this.changed.isAvalilable;
            }
            if(this.changed.IsDishOfDay !== '')
            {
                this.details.IsDishOfDay = this.changed.IsDishOfDay;
            }
        },
        setDishOfDay()
        {
            if(this.changed.IsDishOfDay === '')
            {
                
                this.changed.IsDishOfDay = Boolean(parseInt(this.details.IsDishOfDay));
                this.details.IsDishOfDay = Boolean(parseInt(this.details.IsDishOfDay));
            }
            this.details.IsDishOfDay = !this.details.IsDishOfDay;
        },
        async saveChanges()
        {
            this.modals = [ ];
            if(this.details.IsDishOfDay != this.changed.IsDishOfDay && this.changed.IsDishOfDay !== '')
            {
                this.changed.IsDishOfDay = this.details.IsDishOfDay;
                this.alertHandler(await StaffService.changeDishOfDay(this.$store.getters['user/getToken'],this.details.id,this.details.IsDishOfDay), 'Danie dnia');
            }
            if(this.details.isAvalilable != this.changed.isAvalilable && this.changed.isAvalilable !== '')
            {
                this.changed.isAvalilable = this.details.isAvalilable;
                this.alertHandler(await StaffService.changeAvailbility(this.$store.getters['user/getToken'],this.details.id,this.details.isAvalilable), 'Dostępność dania');
            }
            if((this.details.Description != this.changed.Description&& this.changed.Description !=='' )|| (this.details.Title != this.changed.Title && this.changed.Title !=='') ||(this.details.Price != this.changed.Price && this.changed.Price !==0))
            {
                let temp = {
                    Title: this.details.Title ,
                    Description: this.details.Description ,
                    Price: parseFloat(this.details.Price).toFixed(2)
                }
                this.changed.Description = this.details.Description;
                this.changed.Title = this.details.Title;
                this.changed.Price = this.details.Price;
                this.alertHandler(await StaffService.changeDescription(this.$store.getters['user/getToken'], this.details.id, temp), 'Nazwa, opis oraz nazwa dania');
                
            }
            for(let i = 0; i< this.modals.length; i++)
            {
                await this.$swal(this.modals[i]);
            }
        },
        alertHandler(response, add)
        {
            if(response.status == '200')
                this.modals.push({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">'+add+' pomyślnie zmieniono' +'</h3></center>',
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
            })
            else{
                this.modals.push({
                    html: '<center><h3 style="color: rgb(255, 205, 124); font-family: Avenir, Helvetica, Arial, sans-serif;">'+'Wystąpił błąd przy elemencie '+ add +'</h3></center>',
                    timer: 3000,
                    timerProgressBar: true,
                    toast: true,
                    position: 'top-end',
                    background: '#1b1b1b',
                    showConfirmButton: false,
                    width: '16rem',
                    icon: 'success'
            })
            }

        },
        async focusField(name){
            this.editField = name;
            if(this.changed[name] == '' || this.changed[name] == 0)
            {
                this.changed[name] = await this.details[name];
            }
                
        },
        blurField(){
            this.editField = '';
        },
        showField(name){
            return (this.details[name] == '' || this.editField == name)
        },
        async addRating() {
            await Service.addRating(this.$store.getters['user/getEmail'], this.userRating, this.comment, this.details.id);
            this.$router.go();
        },
    },

    async created() {

        if (this.$route.params.id !== undefined){
            localStorage.setItem("details", JSON.stringify(this.$route.params))
        }
        this.details.isAvalilable = Boolean(parseInt(await this.details.isAvalilable));
        this.details.IsDishOfDay = Boolean(parseInt(await this.details.IsDishOfDay));

        const temp = await Service.getRatings(this.details.id);
        if (temp.data.length != 0) {
            let allRatings = 0;
            for (const item in temp.data) {
                allRatings = allRatings + temp.data[item].Rating;
                this.allRatingsList.push(temp.data[item]);
            }
            let avgAllRatings = allRatings / temp.data.length;
            this.Rating = avgAllRatings;
        } else {
            this.Rating = 0;
            this.isNoRatings = true;
        }
        
        console.log(this.allRatingsList);

    },
    mounted() {
        this.details = JSON.parse(localStorage.getItem("details"));
    },
    computed: {
        ratingInStars() {
            return Math.round(this.Rating*2)/2;
        },
        isHalfStar() {
            if (this.ratingInStars % Math.floor(this.ratingInStars) > 0) {
                return true
            }
            return false;
        },
        logged() {
            return this.$store.getters['user/getLogged'];
        },
    }
}
</script>

<style scoped>
.addto-cart {
    width: 80%;
    background-color: #1b1b1b;
    margin-top: 2em;

    border: 1px solid black;
    border-radius: 10px;

    color: rgb(255, 205, 124);

    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
}
.rating {
    display: flex;
    background-color: #1b1b1b;
    border-top: 1px solid rgb(255, 205, 124);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 0.3em 0;
}
.item {
    width: 20%;
    text-align: center;
}
.rating-stars {
    display: flex;
    font-size: 1.7rem;
}
.see-comment {
    width: 60%;
    text-align: left;
}
.all-ratings {
    margin: 0.5em 0;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
}
.add-rating {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.7em;
}
.add-rating__stars {
    display: flex;
    font-size: 1.5rem;
    margin-bottom: 0.3em;
}
.see-rating__stars {
    display: flex;
    margin: 0.1em 0.2em;
    width: 20%;
}
.add-rating__star:hover {
    cursor: pointer;
}
.no-ratings {
    position: absolute;
    color: red;
    font-weight: bold;
    font-size: 1.6rem;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
}
.isNoRatings {
    opacity: 0.3;
}
.all-ratings__item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: left;
}

.btn {
    margin-top: 0.3em;
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
.comment {
    width: 100%;
    outline: none;
    resize: none;
}

.addto-cart__info {
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;
}
.addto-cart__exit {
    position: absolute;
    top:0;
    right: 0;

    width: 60px;
    height: 60px;
    overflow: hidden;

    font-size: 3em;
    text-decoration: none;
    color: white;

    display: flex;
    align-items: center;
    justify-content: center;
}
.addto-cart__exit:hover {
    color:rgb(203, 214, 209);
}
.addto-cart__number {
    width: 1em;
    height: auto;
    padding: 0.2em;

    font-size: 2em;
    color: rgb(255, 205, 124);

    position: absolute;
    left: 0;
    top: 0;
    z-index: 4;

    border-bottom-left-radius: 0.3em;
}

.addto-cart__exit:hover {
    cursor: pointer;
}

.addto-cart__title {
    display: block;
}

.addto-cart__price {
    margin-top: auto;
    margin-left: auto;
    padding: 0.5em;
    font-size: 2em;
}

.addto-cart__info-content {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: row;
    
}
.addto-cart__info-content-img > img {
    width: 100%;
    height: auto;
    border-radius: 3px;

    transition: transform .5s ease-in;
}
.addto-cart__info-content-img > img:hover {
    transform: scale(1.2);
    cursor: pointer;
}

.addto-cart__info-content-img {
    width: 40%;
    height: 100%;
    max-height: 400px;
    display: flex;
    overflow: hidden;


    justify-content: center;
    align-items: center;
}
.addto-cart__info-content-description {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;
    padding-left: 1em;
}

.addto-cart__bottom {
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0.3em;
}

.addto-cart__add-button {
    background-color: green;
    color: white;
    padding: 0.5em 1.2em;
    margin: 0 0.3em;
    border-radius: 10px;
    font-size: 1.2em;

    transition: padding 0.3s, background-color 0.3s;
}

.addto-cart__add-button:hover {
    background-color: rgb(50, 187, 50);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}

.addto-cart__delete-button {
    background-color: red;
    color: white;
    padding: 0.5em 1.2em;
    border-radius: 10px;
    font-size: 1.2em;
    margin: 0 0.3em;

    transition: padding 0.3s, background-color 0.3s;
}

.addto-cart__delete-button:hover {
    background-color: rgb(211, 43, 43);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.addto-cart__dishofday-button
{
    background-color: rgb(8, 102, 109);
    color: white;
    padding: 0.5em 1.2em;
    margin: 0 0.3em;
    border-radius: 10px;
    font-size: 1.2em;

    transition: padding 0.3s, background-color 0.3s;
}
.addto-cart__dishofday-button:hover
{
    background-color: rgb(35, 197, 197);
    padding: 0.5em 1.6em;
    border-radius: 10px;
    cursor: pointer;
}
.fields-aval-dishofday
{
    display:flex;
}
@media (max-width: 750px) {
    .addto-cart {
        font-size: 0.8em;
    }
    .addto-cart__info-content {
    display: flex;
    flex-direction: column;
    }
    .addto-cart__info-content-description {
        width: 100%;
    }
    .addto-cart__info-content-img {
        display: none;
    }
    .addto-cart__delete-button > span {
        display: none;
    }
    .addto-cart__add-button > span {
        display: none;
    }
    .comment {
        width: 80%;
    }
    .rating {
        font-size: 0.9em;
    }
    .rating-stars {
    font-size: 1.2rem;
    }
    .add-rating__stars {
        font-size: 1.2rem;
        margin-bottom: 0.3em;
    }
    .all-ratings {
        width: 100%;
    }
}

</style>