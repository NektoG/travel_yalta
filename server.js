const express = require('express')

const http = require('http')
const fs = require('fs')

const app = express()

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
})

app.set('view engine', 'ejs')
app.use('/Image', express.static('Image'))
app.use('/Source', express.static('Source'))


const mysql2 = require('mysql2/promise')

const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  database: 'travel_yalta',
  password: '',
  multipleStatements: true,
})

pool.query('SELECT * FROM active_section; SELECT * FROM footer_about_us; SELECT * FROM footer_contacts_topic; SELECT * FROM footer_contacts_item; SELECT * FROM footer_title_for_contacts; SELECT * FROM name_project; SELECT * FROM keywords; SELECT * FROM favicon; SELECT * FROM name_cite').then((data) => {
const active = data[0][0][0];
const footer_about_us = data[0][1];
const footer_contacts_topic = data[0][2];
const footer_contacts_item = data[0][3];
const footer_title_for_contacts = data[0][4];
const name_project = data[0][5];
const keywords = data[0][6];
const favicon = data[0][7];
const name_cite = data[0][8];

const real_name_project = name_project[0]['Description'].substr(0, 100);
const real_keywords = keywords[0]['Description'];

if(active['Main'] != 0){
app.get('/', (req, res)=>{
  pool.query('SELECT * FROM main_description; SELECT * FROM main_for_crimea; SELECT * FROM main_services; SELECT * FROM services_tours_item_description; SELECT * FROM services_tours_item_content; SELECT * FROM services_excursions_item_description; SELECT * FROM services_excursions_item_content; SELECT * FROM services_routes_item_description; SELECT * FROM services_routes_item_content; SELECT * FROM services_add_item_description; SELECT * FROM services_add_item_content; SELECT * FROM main_useful; SELECT * FROM useful_card; SELECT * FROM useful_content; SELECT * FROM main_book_of_reviews; SELECT * FROM main_news; SELECT * FROM news_card; SELECT * FROM news_content; SELECT * FROM discounts_card; SELECT * FROM actual_hot; SELECT * FROM actual_topic;  SELECT * FROM actual_hotels; SELECT * FROM actual_restaurants; SELECT * FROM actual_attractions; SELECT * FROM main_section_elements; SELECT * FROM main_block').then((data) => {
    const description = data[0][0]
    const for_crimea = data[0][1]
    const services = data[0][2]
    const tours_description = data[0][3]
    const tours_content = data[0][4]
    const excursions_description = data[0][5]
    const excursions_content = data[0][6]
    const routes_description = data[0][7]
    const routes_content = data[0][8]
    const add_description = data[0][9]
    const add_content = data[0][10]
    const useful = data[0][11]
    const useful_card = data[0][12]
    const useful_content = data[0][13]
    const book_of_reviews = data[0][14]
    const news = data[0][15]
    const news_card = data[0][16]
    const news_content = data[0][17]
    const discounts = data[0][18]
    const hot = data[0][19]
    const city = data[0][20]
    const hotels = data[0][21]
    const restaurants = data[0][22]
    const attractions = data[0][23]
    const section_elements = data[0][24]
    const true_block = data[0][25][0];

    const image_favicon = '/Image/';
    const real_description = footer_about_us[0]['Description'].substr(0, 97) + '...';

    let data_type_img = [];
    let data_type_info = [];

    let service = [];
    let service_content = [];



  if(true_block['Services'] != 0){
    for(let i = 0; i < services.length; i++){
      let type_img = [];
      let type_info = [];
      const id = (services[i]['id_of_service']-1);
      if(services[i]['type_of_service'] === 1){
        service[i] = tours_description[id];
        service_content[i] = tours_content[id];
        service[i]['Link'] = `/type_services/Service_Tours/:${(id+1)}`;
        service[i]['Img_Link'] = `/Image/Services/Tours/${(id+1)}`;
      } else if(services[i]['type_of_service'] === 2){
        service[i] = excursions_description[id];
        service_content[i] = excursions_content[id];
        service[i]['Link'] = `/type_services/Service_Excursions/:${(id+1)}`;
        service[i]['Img_Link'] = `/Image/Services/Excursions/${(id+1)}`;
      } else if(services[i]['type_of_service'] === 3){
        service[i] = routes_description[id];
        service_content[i] = routes_content[id];
        service[i]['Link'] = `/type_services/Services_Routes/:${(id+1)}`;
        service[i]['Img_Link'] = `/Image/Services/Routes/${(id+1)}`;
      } else if(services[i]['type_of_service'] === 4){
        service[i] = add_description[id];
        service_content[i] = add_content[id];
        service[i]['Link'] = `/type_services/Service_Add/:${(id+1)}`;
        service[i]['Img_Link'] = `/Image/Services/Add/${(id+1)}`;
      }
      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = service_content[i][c_].substr(0, 4);

        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = service_content[i][c_];
        if(info_el === ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_img[i] = type_img;
      data_type_info[i] = type_info;
    }
  }


    let data_type_img_useful = [];
    let data_type_info_useful = [];

  if(true_block['Useful'] != 0){
    for(let i = 0; i < useful.length; i++){

      let type_img = [];
      let type_info = [];
      const id = (useful[i]['num_card']-1);

      const _date = useful_card[id]['Additionaly'];
      const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      const _real_date = `${_date.getDate()} ${months[_date.getMonth()]} ${_date.getFullYear()} (${seasons[Math.round((_date.getMonth()-1) % 11 / 3)]})`
      useful_card[id]['Additionaly'] = _real_date;

      link_useful = `/Useful/:`;
      img_link_useful = `/Image/Useful/`;

      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (useful_content[i][c_]).substr(0, 4);

        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = useful_content[i][c_];
        if(info_el === ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_img_useful[i] = type_img;
      data_type_info_useful[i] = type_info;
    }
}

    let data_type_img_news = [];
    let data_type_info_news = [];

  if(true_block['News'] != 0){
    for(let i = 0; i < news.length; i++){

      let type_img = [];
      let type_info = [];
      const id = (news[i]['num_card']-1);
      const _date = news_card[id]['Additionaly'];
      const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      const _real_date = `${_date.getDate()} ${months[_date.getMonth()]} ${_date.getFullYear()} (${seasons[Math.round((_date.getMonth()-1) % 11 / 3)]})`
      news_card[id]['Additionaly'] = _real_date;

      link_news = `/News/:`;
      img_link_news = `/Image/News/`;

      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (news_content[i][c_]).substr(0, 4);

        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = news_content[i][c_];
        if(info_el === ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_img_news[i] = type_img;
      data_type_info_news[i] = type_info;
    }
  }

    let discounts_type_img = [];
    let discounts_info = [];

    let discount = [];
    let discount_content = [];

    let discount_link = [];
    let discount_link_img = [];

  if(true_block['Discount'] != 0){
    for(let i = 0; i < 2; i++){
      let type_img = [];
      let type_info = [];
      const id = (discounts[i]['id_of_service']-1);
      if(discounts[i]['type_of_service'] === 1){
        discount[i] = tours_description[id];
        discount_content[i] = tours_content[id];
        discount_link[i] = `/type_services/Service_Tours/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Tours/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 2){
        discount[i] = excursions_description[id];
        discount_content[i] = excursions_content[id];
        discount_link[i] = `/type_services/Service_Excursions/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Excursions/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 3){
        discount[i] = routes_description[id];
        discount_content[i] = routes_content[id];
        discount_link[i] = `/type_services/Services_Routes/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Routes/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 4){
        discount[i] = add_description[id];
        discount_content[i] = add_content[id];
        discount_link[i] = `/type_services/Service_Add/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Add/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 5){
      discount[i] = discounts[i];
      discount_link[i] = discounts[i]['Link'];
      discount_link_img[i] = '/Image/Discounts/';
    }
    if(discounts[i]['type_of_service'] <= 4 && discounts[i]['type_of_service'] > 0){
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = discount_content[i][c_];

        if(info_el === ''){
          const a_ = `С_${(j+1)}`;
          type_info = discount_content[i][a_];
          const img_el = (discount_content[i][a_]).substr(0, 4);


          if(img_el === 'http'){
            type_img = 1;
          }
          else{
            type_img = 0;
          }
          break;
        }
      }
    }
    else if(discounts[i]['type_of_service'] === 5) {
      const a_ = `Img_1`;
      type_info = discount[i][a_];
      const img_el = (discount[i][a_]).substr(0, 4);


      if(img_el === 'http'){
        type_img = 1;
      }
      else{
        type_img = 0;
      }
    }
      discounts_type_img[i] = type_img;
      discounts_info[i] = type_info;
    }
  }



    const img_link_hot = `/Image/Actual/`;

    let data_count_city = [];
  if(true_block['Actual'] != 0){
    for(let i = 0; i < city.length; i++){
      let count_city = 0;
      for(let j = 0; j < 5; j++){
        const num_card = `num_card_${(j+1)}`;
        const type_card = `type_card_${(j+1)}`;
        if(city[i][num_card] != 0 && city[i][type_card] != 0){
          count_city++;
        }
      }
      data_count_city[i] = count_city;
    }
  }

    let hotels_count_card = []
    let restaurants_count_card = []
    let attractions_count_card = []

if(true_block['Actual'] != 0){
    for(let i = 0; i <= city.length; i++){
      let h_count_card = 0;
      let r_count_card = 0;
      let a_count_card = 0;
      for(let j = 0; j < hotels.length; j++){
        if(hotels[j]['num_topic'] === (i+1)){
          h_count_card++;
        }
      }
      hotels_count_card[i] = h_count_card;

      for(let j = 0; j < restaurants.length; j++){
        if(restaurants[j]['num_topic'] === (i+1)){
          r_count_card++;
        }
      }
      restaurants_count_card[i] = r_count_card;

      for(let j = 0; j < attractions.length; j++){
        if(attractions[j]['num_topic'] === (i+1)){
          a_count_card++;
        }
      }
      attractions_count_card[i] = a_count_card;
    }
  }

    let type_hotels_img = [];
    let type_restaurants_img = [];
    let type_attractions_img = [];

    let hotels_img = [];
    let restaurants_img = [];
    let attractions_img = [];

  if(true_block['Actual'] != 0){
    for(let i = 0; i < city.length; i++){
      for(let j = 0; j < 5; j++){
        const num_card = `num_card_${(j+1)}`;
        const type_card = `type_card_${(j+1)}`;
          const a_ = `Img`;
          if(city[i][type_card] === 1){
              const city_num_card = ((city[i][num_card]-1) + i*hotels_count_card[i]);
              const img_el = (hotels[city_num_card][a_]).substr(0, 4);
              if(img_el === 'http'){
                hotels_img[j] = 1;
              }
              else{
                hotels_img[j] = 0;
              }
          }
          else if(city[i][type_card] === 2){
            const city_num_card = ((city[i][num_card]-1) + i*restaurants_count_card[i]);
            const img_el = (restaurants[city_num_card][a_]).substr(0, 4);
            if(img_el === 'http'){
              restaurants_img[j] = 1;
            }
            else{
              restaurants_img[j] = 0;
            }
          }
          else if(city[i][type_card] === 3){
            const city_num_card = ((city[i][num_card]-1) + i*attractions_count_card[i]);
            const img_el = (attractions[city_num_card][a_]).substr(0, 4);
            if(img_el === 'http'){
              attractions_img[j] = 1;
            }
            else{
              attractions_img[j] = 0;
            }
          }
        }
      type_hotels_img[i] = hotels_img;
      type_restaurants_img[i] = restaurants_img;
      type_attractions_img[i] = attractions_img;
    }
  }
    let data_type_hot_img = [];
  if(true_block['Actual'] != 0){
    for(let i = 0; i < hot.length; i++){
      let type_img = [];
      const a_ = `Img`;
      for(let j = 0; j < 4; j++){
        const num_card = `num_card_${(j+1)}`;
        const type_card = `num_topic_${(j+1)}`;
        if((i+1) === 1){
          const city_num_card = ((hot[i][num_card]-1) + (hot[i][type_card]-1)*hotels_count_card[(hot[i][num_card]-1)]);
          const img_el = (hotels[city_num_card][a_]).substr(0, 4);
          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
        if((i+1) === 2){
          const city_num_card = ((hot[i][num_card]-1) + (hot[i][type_card]-1)*restaurants_count_card[(hot[i][num_card]-1)]);
          const img_el = (restaurants[city_num_card][a_]).substr(0, 4);
          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
        if((i+1) === 3){
          const city_num_card = ((hot[i][num_card]-1) + (hot[i][type_card]-1)*attractions_count_card[(hot[i][num_card]-1)]);
          const img_el = (attractions[city_num_card][a_]).substr(0, 4);
          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
      }
      data_type_hot_img[i] = type_img;
    }
  }
    res.render('Main',{active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts ,description, for_crimea, service, service_content, data_type_img, data_type_info, useful, useful_card, useful_content, link_useful, img_link_useful, data_type_info_useful, data_type_img_useful, news, news_card, news_content, link_news, img_link_news, data_type_info_news, data_type_img_news, book_of_reviews, news, discount, discounts_type_img, discounts_info, discount_link, discount_link_img, hot, hotels_count_card, restaurants_count_card, attractions_count_card, data_type_hot_img, city, data_count_city, hotels, restaurants, attractions, img_link_hot, section_elements, true_block})
  })
})
}
if(active['Type_Services'] != 0){
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
app.get('/type_services', (req, res) => {
  pool.query('SELECT * FROM type_services_description; SELECT * FROM type_services_card; SELECT * FROM services_tours_item_content; SELECT * FROM services_excursions_item_content; SELECT * FROM services_routes_item_content; SELECT * FROM services_add_item_content').then((data) => {
    const introduction = data[0][0]
    const card = data[0][1]
    const tours_content = data[0][2]
    const excursions_content = data[0][3]
    const routes_content = data[0][4]
    const add_content = data[0][5]

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    data_img = [];
    function change(data_content, i, link){
      const pack = [];
      for (var j = 1; j <= 3; j++) {
        const num = card[i][`num_card_${j}`];
        const img = card[i][`num_img_${j}`]
        if(num != 0 && num <= data_content.length){
          if(img != 0 && img <= 5 && data_content[(num-1)][`С_${img}`] != ''){
            if(data_content[(num-1)][`A_${img}`] === ''){
              if(data_content[(num-1)][`С_${img}`].substr(0,4) === 'http'){
                pack[(j-1)] = data_content[(num-1)][`С_${img}`];
              }
              else{
                pack[(j-1)] = link + num + '/' + data_content[(num-1)][`С_${img}`];
              }
            }
            else{
              if(data_content[(num-1)][`A_${img}`].substr(0,4) === 'http'){
                pack[(j-1)] = data_content[(num-1)][`A_${img}`];
              }
              else{
                pack[(j-1)] = link + num + '/' + data_content[(num-1)][`A_${img}`];
              }
            }
          }
          else{
            console.log(`Type_Services: Проблема с картинкой ${img} из карточки ${num} в номере Типа Услуг c ID ${i+1}`);
          }
        }
        else{
          console.log(`Type_Services: Проблема с карточкой ${num} в Типе Услуг с ID ${i+1}`);
        }
      }
      return pack;
    }
    for(let i = 0; i < card.length; i++){
      switch (i) {
        case 0:
          data_img[i] = change(tours_content, i, '/Image/Services/Tours/');
          break;
        case 1:
          data_img[i] = change(excursions_content, i, '/Image/Services/Excursions/');
          break;
        case 2:
          data_img[i] = change(routes_content, i, '/Image/Services/Routes/');
          break;
        case 3:
          data_img[i] = change(add_content, i, '/Image/Services/Add/');
          break;
      }
    }

    res.render('Type_Services', {active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, card, data_img});
  })
})
}

if(active['Service_Tours'] != 0){
app.get('/type_services/Service_Tours', (req, res) => {
  pool.query('SELECT * FROM services_tours_description; SELECT * FROM services_tours_no_find; SELECT * FROM services_tours_item_description; SELECT * FROM services_tours_item_content').then((data) => {
    const introduction = data[0][0]
    const no_find = data[0][1]
    const data_card = data[0][2]
    const data_content = data[0][3]

    const type_cite = 'Tours';

    const image_favicon = '../Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link = '/type_services/Service_Tours/:';
    const img_link = '../Image/Services/Tours/';

    let data_type_img = [];
    for(let i = 0; i < data_card.length; i++){
      let type_img = [];
      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (data_content[i][c_]).substr(0, 4);

        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      data_type_img[i] = type_img;
    }
    let data_type_info = [];
    for(let i = 0; i < data_card.length; i++){
      let type_info = [];
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = (data_content[i][c_]);
        if(info_el != ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_info[i] = type_info;
    }

    res.render('Services', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, no_find, data_card, data_content, link, img_link, data_type_img, data_type_info});
  })
})

app.get('/type_services/Service_Tours/:item', (req, res) => {
  pool.query('SELECT * FROM services_tours_item_content; SELECT * FROM services_tours_item_description').then((data) => {
    const content = data[0][0]
    const description = data[0][1]

    const type_cite = 'Tours';

    let item = req.params.item;
    item = Number(item.substr(1));
    item = item-1;

    const image_favicon = '../../Image/';
    const real_description = description[item]['Desc_2'].substr(0, 97) + '...';

    const img_link = '../../Image/Services/Tours/';

    let data_type_img = [];
    for(let j = 0; j < 5; j++){
      const c_ = `С_${(j+1)}`;
      const img_el = (content[item][c_]).substr(0, 4);
      if(img_el === 'http'){
        data_type_img[j] = 1;
      }
      else{
        data_type_img[j] = 0;
      }
    }
    let data_type_info_id = [];
    let data_type_info = [];
    for(let j = 0; j < 5; j++){
      const c_ = `A_${(j+1)}`;
      const info_el = (content[item][c_]);
      if(info_el != ''){
        data_type_info[j] = 1;
        if(info_el.substr(0, 4) === 'http'){
          data_type_info_id[j] = 1;
        }
        else{
          data_type_info_id[j] = 0;
        }
      }
      else{
        data_type_info[j] = 0;
        data_type_info_id[j] = 0;
      }
    }


    res.render('Service_Item', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, content, description, item, img_link, data_type_img, data_type_info, data_type_info_id});
  })
})
}
if(active['Service_Excursions'] != 0){
app.get('/type_services/Service_Excursions', (req, res) => {
  pool.query('SELECT * FROM services_excursions_description; SELECT * FROM services_excursions_no_find; SELECT * FROM services_excursions_item_description; SELECT * FROM services_excursions_item_content').then((data) => {
    const introduction = data[0][0]
    const no_find = data[0][1]
    const data_card = data[0][2]
    const data_content = data[0][3]

    const type_cite = 'Excursions';

    const image_favicon = '../Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link = '/type_services/Service_Excursions/:';
    const img_link = '../Image/Services/Excursions/';

    let data_type_img = [];
    for(let i = 0; i < data_card.length; i++){
      let type_img = [];
      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (data_content[i][c_]).substr(0, 4);

        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      data_type_img[i] = type_img;
    }
    let data_type_info = [];
    for(let i = 0; i < data_card.length; i++){
      let type_info = [];
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = (data_content[i][c_]);
        if(info_el != ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_info[i] = type_info;
    }


    res.render('Services', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, no_find, data_card, data_content, link, img_link, data_type_img, data_type_info});
  })
})
app.get('/type_services/Service_Excursions/:item', (req, res) => {
  pool.query('SELECT * FROM services_excursions_item_content; SELECT * FROM services_excursions_item_description').then((data) => {
    const content = data[0][0]
    const description = data[0][1]

    const type_cite = 'Excursions';

    let item = req.params.item;
    item = Number(item.substr(1));
    item = item-1;

    const image_favicon = '../../Image/';
    const real_description = description[item]['Desc_2'].substr(0, 97) + '...';

    const img_link = '../../Image/Services/Excursions/';

    let data_type_img = [];
    for(let j = 0; j < 5; j++){
      const c_ = `С_${(j+1)}`;
      const img_el = (content[item][c_]).substr(0, 4);
      if(img_el === 'http'){
        data_type_img[j] = 1;
      }
      else{
        data_type_img[j] = 0;
      }
    }
    let data_type_info_id = [];
    let data_type_info = [];
    for(let j = 0; j < 5; j++){
      const c_ = `A_${(j+1)}`;
      const info_el = (content[item][c_]);
      if(info_el != ''){
        data_type_info[j] = 1;
        if(info_el.substr(0, 4) === 'http'){
          data_type_info_id[j] = 1;
        }
        else{
          data_type_info_id[j] = 0;
        }
      }
      else{
        data_type_info[j] = 0;
        data_type_info_id[j] = 0;
      }
    }


    res.render('Service_Item', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, content, description, item, img_link, data_type_img, data_type_info, data_type_info_id});
  })
})
}
if(active['Service_Routes'] != 0){
app.get('/type_services/Services_Routes', (req, res) => {
  pool.query('SELECT * FROM services_routes_description; SELECT * FROM services_routes_no_find; SELECT * FROM services_routes_item_description; SELECT * FROM services_routes_item_content').then((data) => {
    const introduction = data[0][0]
    const no_find = data[0][1]
    const data_card = data[0][2]
    const data_content = data[0][3]

    const type_cite = 'Routes';

    const image_favicon = '../Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link = '/type_services/Services_Routes/:';
    const img_link = '../Image/Services/Routes/';

    let data_type_img = [];
    for(let i = 0; i < data_card.length; i++){
      let type_img = [];
      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (data_content[i][c_]).substr(0, 4);

        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      data_type_img[i] = type_img;
    }
    let data_type_info = [];
    for(let i = 0; i < data_card.length; i++){
      let type_info = [];
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = (data_content[i][c_]);
        if(info_el != ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_info[i] = type_info;
    }


    res.render('Services', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, no_find, data_card, data_content, link, img_link, data_type_img, data_type_info});
  })
})
app.get('/type_services/Services_Routes/:item', (req, res) => {
  pool.query('SELECT * FROM services_routes_item_content; SELECT * FROM services_routes_item_description').then((data) => {
    const content = data[0][0]
    const description = data[0][1]

    const type_cite = 'Routes';

    let item = req.params.item;
    item = Number(item.substr(1));
    item = item-1;

    const image_favicon = '../../Image/';
    const real_description = description[item]['Desc_2'].substr(0, 97) + '...';

    const img_link = '../../Image/Services/Routes/';

    let data_type_img = [];
    for(let j = 0; j < 5; j++){
      const c_ = `С_${(j+1)}`;
      const img_el = (content[item][c_]).substr(0, 4);
      if(img_el === 'http'){
        data_type_img[j] = 1;
      }
      else{
        data_type_img[j] = 0;
      }
    }
    let data_type_info_id = [];
    let data_type_info = [];
    for(let j = 0; j < 5; j++){
      const c_ = `A_${(j+1)}`;
      const info_el = (content[item][c_]);
      if(info_el != ''){
        data_type_info[j] = 1;
        if(info_el.substr(0, 4) === 'http'){
          data_type_info_id[j] = 1;
        }
        else{
          data_type_info_id[j] = 0;
        }
      }
      else{
        data_type_info[j] = 0;
        data_type_info_id[j] = 0;
      }
    }


    res.render('Service_Item', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, content, description, item, img_link, data_type_img, data_type_info, data_type_info_id});
  })
})
}

if(active['Service_Add'] != 0){
app.get('/type_services/Services_Add', (req, res) => {

    pool.query('SELECT * FROM services_add_description; SELECT * FROM services_add_no_find; SELECT * FROM services_add_item_description; SELECT * FROM services_add_item_content').then((data) => {
      const introduction = data[0][0]
      const no_find = data[0][1]
      const data_card = data[0][2]
      const data_content = data[0][3]

      const type_cite = 'Add';

      const image_favicon = '../Image/';
      const real_description = introduction[0]['Description'].substr(0, 97) + '...';

      const link = '/type_services/Services_Add/:';
      const img_link = '../Image/Services/Add/';

      let data_type_img = [];
      for(let i = 0; i < data_card.length; i++){
        let type_img = [];
        for(let j = 0; j < 5; j++){
          const c_ = `С_${(j+1)}`;
          const img_el = (data_content[i][c_]).substr(0, 4);

          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
        data_type_img[i] = type_img;
      }
      let data_type_info = [];
      for(let i = 0; i < data_card.length; i++){
        let type_info = [];
        for(let j = 0; j < 5; j++){
          const c_ = `A_${(j+1)}`;
          const info_el = (data_content[i][c_]);
          if(info_el != ''){
            type_info[j] = 1;
          }
          else{
            type_info[j] = 0;
          }
        }
        data_type_info[i] = type_info;
      }


      res.render('Service_Additionally', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, no_find, data_card, data_content, link, img_link, data_type_img, data_type_info});
    })
})
app.get('/type_services/Services_Add/:item', (req, res) => {
  pool.query('SELECT * FROM services_add_item_content; SELECT * FROM services_add_item_description').then((data) => {
    const content = data[0][0]
    const description = data[0][1]

    const type_cite = 'Add';

    let item = req.params.item;
    item = Number(item.substr(1));
    item = item-1;

    const image_favicon = '../../Image/';
    const real_description = description[item]['Desc_2'].substr(0, 97) + '...';

    const img_link = '../../Image/Services/Add/';

    let data_type_img = [];
    for(let j = 0; j < 5; j++){
      const c_ = `С_${(j+1)}`;
      const img_el = (content[item][c_]).substr(0, 4);
      if(img_el === 'http'){
        data_type_img[j] = 1;
      }
      else{
        data_type_img[j] = 0;
      }
    }
    let data_type_info_id = [];
    let data_type_info = [];
    for(let j = 0; j < 5; j++){
      const c_ = `A_${(j+1)}`;
      const info_el = (content[item][c_]);
      if(info_el != ''){
        data_type_info[j] = 1;
        if(info_el.substr(0, 4) === 'http'){
          data_type_info_id[j] = 1;
        }
        else{
          data_type_info_id[j] = 0;
        }
      }
      else{
        data_type_info[j] = 0;
        data_type_info_id[j] = 0;
      }
    }
    res.render('Service_Item', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, content, description, item, img_link, data_type_img, data_type_info, data_type_info_id});
  })
})
}

if(active['News'] != 0){
app.get('/News', (req, res) => {
  pool.query('SELECT * FROM news_description; SELECT * FROM news_card; SELECT * FROM news_content; SELECT * FROM news_no_find').then((data) => {
    const introduction = data[0][0]
    const card = data[0][1]
    const content = data[0][2]
    const no_find = data[0][3]

    const type_cite = 'News';

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link = '/News/:';
    const img_link = '/Image/News/';

    let data_type_img = [];
    let data_type_info = [];

    for(let i = 0; i < card.length; i++){

      const _date = card[i]['Additionaly'];
      const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      const _real_date = `${_date.getDate()} ${months[_date.getMonth()]} ${_date.getFullYear()} (${seasons[Math.round((_date.getMonth()-1) % 11 / 3)]})`
      card[i]['Additionaly'] = _real_date;

      let type_img = [];
      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (content[i][c_]).substr(0, 4);
        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      let type_info = [];
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = (content[i][c_]);
        if(info_el != ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_img[i] = type_img;
      data_type_info[i] = type_info;
    }

    res.render('News_and_Useful', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, card, content, no_find, data_type_img, data_type_info, link, img_link});
  })
})
app.get('/News/:item', (req, res) => {
  pool.query('SELECT * FROM news_card; SELECT * FROM news_content').then((data) => {
    const card = data[0][0]
    const content = data[0][1]

    const img_link = '../Image/News/';

    const type_cite = 'News';

    let item = req.params.item;
    item = Number(item.substr(1));
    item = item-1;

    const image_favicon = '../Image/';
    const real_description = card[item]['Description'].substr(0, 97) + '...';

    const _date = card[item]['Additionaly'];
    const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const _real_date = `${_date.getDate()} ${months[_date.getMonth()]} ${_date.getFullYear()} (${seasons[Math.round((_date.getMonth()-1) % 11 / 3)]})`
    card[item]['Additionaly'] = _real_date;

    let data_type_img = [];
    for(let j = 0; j < 5; j++){
      const c_ = `С_${(j+1)}`;
      const img_el = (content[item][c_]).substr(0, 4);
      if(img_el === 'http'){
        data_type_img[j] = 1;
      }
      else{
        data_type_img[j] = 0;
      }
    }
    let data_type_info_id = [];
    let data_type_info = [];
    for(let j = 0; j < 5; j++){
      const c_ = `A_${(j+1)}`;
      const info_el = (content[item][c_]);
      if(info_el != ''){
        data_type_info[j] = 1;
        if(info_el.substr(0, 4) === 'http'){
          data_type_info_id[j] = 1;
        }
        else{
          data_type_info_id[j] = 0;
        }
      }
      else{
        data_type_info[j] = 0;
        data_type_info_id[j] = 0;
      }
    }

    res.render('News_and_Useful_Item', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, card, content, data_type_img, data_type_info, data_type_info_id, img_link, item});
  })
})
}
if(active['Useful'] != 0){
app.get('/Useful', (req, res) => {
  pool.query('SELECT * FROM useful_description; SELECT * FROM useful_card; SELECT * FROM useful_content; SELECT * FROM useful_no_find').then((data) => {
    const introduction = data[0][0]
    const card = data[0][1]
    const content = data[0][2]
    const no_find = data[0][3]

    const type_cite = 'Useful';

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link = '/Useful/:';
    const img_link = '/Image/Useful/';

    let data_type_img = [];
    let data_type_info = [];

    for(let i = 0; i < card.length; i++){

      const _date = card[i]['Additionaly'];
      const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];
      const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
      const _real_date = `${_date.getDate()} ${months[_date.getMonth()]} ${_date.getFullYear()} (${seasons[Math.round((_date.getMonth()-1) % 11 / 3)]})`
      card[i]['Additionaly'] = _real_date;

      let type_img = [];
      for(let j = 0; j < 5; j++){
        const c_ = `С_${(j+1)}`;
        const img_el = (content[i][c_]).substr(0, 4);
        if(img_el === 'http'){
          type_img[j] = 1;
        }
        else{
          type_img[j] = 0;
        }
      }
      let type_info = [];
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = (content[i][c_]);
        if(info_el != ''){
          type_info[j] = 1;
        }
        else{
          type_info[j] = 0;
        }
      }
      data_type_img[i] = type_img;
      data_type_info[i] = type_info;
    }

    res.render('News_and_Useful', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, card, content, no_find, data_type_img, data_type_info, link, img_link});
  })
})
app.get('/Useful/:item', (req, res) => {
  pool.query('SELECT * FROM useful_card; SELECT * FROM useful_content').then((data) => {
    const card = data[0][0]
    const content = data[0][1]

    const img_link = '../Image/Useful/';

    const type_cite = 'Useful';

    let item = req.params.item;
    item = Number(item.substr(1));
    item = item-1;

    const image_favicon = '../Image/';
    const real_description = card[item]['Description'].substr(0, 97) + '...';

    const _date = card[item]['Additionaly'];
    const seasons = ['Зима', 'Весна', 'Лето', 'Осень'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const _real_date = `${_date.getDate()} ${months[_date.getMonth()]} ${_date.getFullYear()} (${seasons[Math.round((_date.getMonth()-1) % 11 / 3)]})`
    card[item]['Additionaly'] = _real_date;

    let data_type_img = [];
    for(let j = 0; j < 5; j++){
      const c_ = `С_${(j+1)}`;
      const img_el = (content[item][c_]).substr(0, 4);
      if(img_el === 'http'){
        data_type_img[j] = 1;
      }
      else{
        data_type_img[j] = 0;
      }
    }
    let data_type_info_id = [];
    let data_type_info = [];
    for(let j = 0; j < 5; j++){
      const c_ = `A_${(j+1)}`;
      const info_el = (content[item][c_]);
      if(info_el != ''){
        data_type_info[j] = 1;
        if(info_el.substr(0, 4) === 'http'){
          data_type_info_id[j] = 1;
        }
        else{
          data_type_info_id[j] = 0;
        }
      }
      else{
        data_type_info[j] = 0;
        data_type_info_id[j] = 0;
      }
    }

    res.render('News_and_Useful_Item', {type_cite, active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, card, content, data_type_img, data_type_info, data_type_info_id, img_link, item});
  })
})
}
if(active['Discounts'] != 0){
app.get('/Discounts', (req, res) => {
  pool.query('SELECT * FROM discounts_description; SELECT * FROM discounts_card; SELECT * FROM discounts_default; SELECT * FROM services_tours_item_description; SELECT * FROM services_tours_item_content; SELECT * FROM services_excursions_item_description; SELECT * FROM services_excursions_item_content; SELECT * FROM services_routes_item_description; SELECT * FROM services_routes_item_content; SELECT * FROM services_add_item_description; SELECT * FROM services_add_item_content').then((data) => {
    const introduction = data[0][0]
    const discounts = data[0][1]
    const _default = data[0][2]
    const tours_description = data[0][3]
    const tours_content = data[0][4]
    const excursions_description = data[0][5]
    const excursions_content = data[0][6]
    const routes_description = data[0][7]
    const routes_content = data[0][8]
    const add_description = data[0][9]
    const add_content = data[0][10]

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    let discounts_type_img = [];
    let discounts_info = [];

    let discount = [];
    let discount_content = [];

    let discount_link = [];
    let discount_link_img = [];

    for(let i = 0; i < discounts.length; i++){
      let type_img = [];
      let type_info = [];
      const id = (discounts[i]['id_of_service']-1);
      if(discounts[i]['type_of_service'] === 1){
        discount[i] = tours_description[id];
        discount_content[i] = tours_content[id];
        discount_link[i] = `/type_services/Service_Tours/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Tours/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 2){
        discount[i] = excursions_description[id];
        discount_content[i] = excursions_content[id];
        discount_link[i] = `/type_services/Service_Excursions/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Excursions/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 3){
        discount[i] = routes_description[id];
        discount_content[i] = routes_content[id];
        discount_link[i] = `/type_services/Services_Routes/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Routes/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 4){
        discount[i] = add_description[id];
        discount_content[i] = add_content[id];
        discount_link[i] = `/type_services/Service_Add/:${(id+1)}`;
        discount_link_img[i] = `/Image/Services/Add/${(id+1)}`;
      } else if(discounts[i]['type_of_service'] === 5){
      discount[i] = discounts[i];
      discount_link[i] = discounts[i]['Link'];
      discount_link_img[i] = '/Image/Discounts/';
    }
    if(discounts[i]['type_of_service'] <= 4 && discounts[i]['type_of_service'] > 0){
      for(let j = 0; j < 5; j++){
        const c_ = `A_${(j+1)}`;
        const info_el = discount_content[i][c_];

        if(info_el === ''){
          const a_ = `С_${(j+1)}`;
          type_info = discount_content[i][a_];
          const img_el = (discount_content[i][a_]).substr(0, 4);


          if(img_el === 'http'){
            type_img = 1;
          }
          else{
            type_img = 0;
          }
          break;
        }
      }
    }
    else if(discounts[i]['type_of_service'] === 5) {
      const a_ = `Img_1`;
      type_info = discount[i][a_];
      const img_el = (discount[i][a_]).substr(0, 4);


      if(img_el === 'http'){
        type_img = 1;
      }
      else{
        type_img = 0;
      }
    }
      discounts_type_img[i] = type_img;
      discounts_info[i] = type_info;
    }

    res.render('Discounts', {active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, _default, discount, discounts_type_img, discounts_info, discount_link, discount_link_img});
  })
})
}
if(active['Actual'] != 0){
app.get('/Actual_Type', (req, res) => {
  pool.query('SELECT * FROM actual_description; SELECT * FROM actual_default; SELECT * FROM actual_hot; SELECT * FROM actual_topic;  SELECT * FROM actual_hotels; SELECT * FROM actual_restaurants; SELECT * FROM actual_attractions').then((data) => {
    const introduction = data[0][0]
    const _default = data[0][1]
    const hot = data[0][2]
    const city = data[0][3]
    const hotels = data[0][4]
    const restaurants = data[0][5]
    const attractions = data[0][6]


    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link = '/Actual_Type/:';
    const img_link = `/Image/Actual/`;



    let data_count_city = [];
    for(let i = 0; i < city.length; i++){
      let count_city = 0;
      for(let j = 0; j < 5; j++){
        const num_card = `num_card_${(j+1)}`;
        const type_card = `type_card_${(j+1)}`;
        if(city[i][num_card] != 0 && city[i][type_card] != 0){
          count_city++;
        }
      }
      data_count_city[i] = count_city;
    }

    let hotels_count_card = []
    let restaurants_count_card = []
    let attractions_count_card = []

    for(let i = 0; i <= city.length; i++){
      let h_count_card = 0;
      let r_count_card = 0;
      let a_count_card = 0;
      for(let j = 0; j < hotels.length; j++){
        if(hotels[j]['num_topic'] === (i+1)){
          h_count_card++;
        }
      }
      hotels_count_card[i] = h_count_card;

      for(let j = 0; j < restaurants.length; j++){
        if(restaurants[j]['num_topic'] === (i+1)){
          r_count_card++;
        }
      }
      restaurants_count_card[i] = r_count_card;

      for(let j = 0; j < attractions.length; j++){
        if(attractions[j]['num_topic'] === (i+1)){
          a_count_card++;
        }
      }
      attractions_count_card[i] = a_count_card;
    }

    let type_hotels_img = [];
    let type_restaurants_img = [];
    let type_attractions_img = [];


    let hotels_img = [];
    let restaurants_img = [];
    let attractions_img = [];

    for(let i = 0; i < city.length; i++){
      for(let j = 0; j < 5; j++){
        const num_card = `num_card_${(j+1)}`;
        const type_card = `type_card_${(j+1)}`;
          const a_ = `Img`;
          if(city[i][type_card] === 1){
              const city_num_card = ((city[i][num_card]-1) + i*hotels_count_card[i]);
              const img_el = (hotels[city_num_card][a_]).substr(0, 4);
              if(img_el === 'http'){
                hotels_img[j] = 1;
              }
              else{
                hotels_img[j] = 0;
              }
          }
          else if(city[i][type_card] === 2){
            const city_num_card = ((city[i][num_card]-1) + i*restaurants_count_card[i]);
            const img_el = (restaurants[city_num_card][a_]).substr(0, 4);
            if(img_el === 'http'){
              restaurants_img[j] = 1;
            }
            else{
              restaurants_img[j] = 0;
            }
          }
          else if(city[i][type_card] === 3){
            const city_num_card = ((city[i][num_card]-1) + i*attractions_count_card[i]);
            const img_el = (attractions[city_num_card][a_]).substr(0, 4);
            if(img_el === 'http'){
              attractions_img[j] = 1;
            }
            else{
              attractions_img[j] = 0;
            }
          }
        }
      type_hotels_img[i] = hotels_img;
      type_restaurants_img[i] = restaurants_img;
      type_attractions_img[i] = attractions_img;
    }
    let data_type_hot_img = [];
    for(let i = 0; i < hot.length; i++){
      let type_img = [];
      const a_ = `Img`;
      for(let j = 0; j < 4; j++){
        const num_card = `num_card_${(j+1)}`;
        const type_card = `num_topic_${(j+1)}`;
        if((i+1) === 1){
          const city_num_card = ((hot[i][num_card]-1) + (hot[i][type_card]-1)*hotels_count_card[(hot[i][num_card]-1)]);
          const img_el = (hotels[city_num_card][a_]).substr(0, 4);
          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
        if((i+1) === 2){
          const city_num_card = ((hot[i][num_card]-1) + (hot[i][type_card]-1)*restaurants_count_card[(hot[i][num_card]-1)]);
          const img_el = (restaurants[city_num_card][a_]).substr(0, 4);
          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
        if((i+1) === 3){
          const city_num_card = ((hot[i][num_card]-1) + (hot[i][type_card]-1)*attractions_count_card[(hot[i][num_card]-1)]);
          const img_el = (attractions[city_num_card][a_]).substr(0, 4);
          if(img_el === 'http'){
            type_img[j] = 1;
          }
          else{
            type_img[j] = 0;
          }
        }
      }
      data_type_hot_img[i] = type_img;
    }

    res.render('Actual_Type', {active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, _default, hot, hotels_count_card, restaurants_count_card, attractions_count_card, data_type_hot_img, city, data_count_city, introduction, hotels, restaurants, attractions, link, img_link, type_hotels_img, type_restaurants_img, type_attractions_img});
  })
})

app.get('/Actual_Type/:item', (req, res) => {
  pool.query('SELECT * FROM actual_topic; SELECT * FROM actual_description; SELECT * FROM actual_hotels; SELECT * FROM actual_restaurants; SELECT * FROM actual_attractions; SELECT * FROM actual_hot').then((data) => {
    const city = data[0][0]
    const introduction = data[0][1]
    const hotels = data[0][2]
    const restaurants = data[0][3]
    const attractions = data[0][4]
    const hot = data[0][5]

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    let item = req.params.item;
    item = Number(item.substr(1));

    const img_link = `../Image/Actual/${item}/`;

    let type_hotels_img = [];
    let type_restaurants_img = [];
    let type_attractions_img = [];

    for(let i = 0; i < hotels.length; i++){
      const a_ = `Img`;
      const img_el = (hotels[i][a_]).substr(0, 4);
      if(item === hotels[i]['num_topic']){
        if(img_el === 'http'){
          type_hotels_img[i] = 1;
        }
        else{
          type_hotels_img[i] = 0;
        }
      }
    }

    for(let i = 0; i < restaurants.length; i++){
      const a_ = `Img`;
      const img_el = (restaurants[i][a_]).substr(0, 4);
      if(item === restaurants[i]['num_topic']){
        if(img_el === 'http'){
          type_restaurants_img[i] = 1;
        }
        else{
          type_restaurants_img[i] = 0;
        }
      }
    }
    for(let i = 0; i < attractions.length; i++){
      const a_ = `Img`;
      const img_el = (attractions[i][a_]).substr(0, 4);
      if(item === attractions[i]['num_topic']){
        if(img_el === 'http'){
          type_attractions_img[i] = 1;
        }
        else{
          type_attractions_img[i] = 0;
        }
      }
    }

    res.render('Actual', {active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, city, introduction, hotels, restaurants, attractions, item, img_link, type_hotels_img, type_restaurants_img, type_attractions_img, hot});
  })
})
}
if(active['Album'] != 0){
app.get('/Album', (req, res) => {
  pool.query('SELECT * FROM album_description; SELECT * FROM album_card; SELECT * FROM album_card_topic').then((data) => {
    const introduction = data[0][0]
    const card = data[0][1]
    const card_topic = data[0][2]

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const img_link = '/Image/Album/';
    let type_img = [];
    for(let i = 0; i < card.length; i++){
      const a_ = `Img`;
      const img_el = (card[i][a_]).substr(0, 4);
      if(img_el === 'http'){
        type_img[i] = 1;
      }
      else{
        type_img[i] = 0;
      }
    }

    res.render('Album', {active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, card, card_topic, type_img, img_link});
  })
})
}
if(active['Book_of_Reviews'] != 0){
app.get('/Book_of_reviews', (req, res) => {
  pool.query('SELECT * FROM bor_description; SELECT * FROM bor_card; SELECT * FROM bor_card_topic').then((data) => {
    const introduction = data[0][0]
    const card = data[0][1]
    const card_topic = data[0][2]

    const image_favicon = '/Image/';
    const real_description = introduction[0]['Description'].substr(0, 97) + '...';

    const link_Tours = '/type_services/Services_Tours/:';
    const link_Excursions = '/type_services/Services_Excursions/:';
    const link_Routes = '/type_services/Services_Routes/:';
    const link_Add = '/type_services/Services_Add/:';

    let type_link = [];
    for (var i = 0; i < card_topic.length; i++) {
      switch (card_topic[i]['type_service']) {
        case 1:
          type_link[i] = link_Tours;
        break;
        case 2:
          type_link[i] = link_Excursions;
        break;
        case 3:
          type_link[i] = link_Routes;
        break;
        case 4:
          type_link[i] = link_Add;
        break;
      }
    }

    res.render('Book_of_reviews', {active, image_favicon, favicon, name_cite, real_name_project, real_description, real_keywords, footer_about_us, footer_contacts_topic, footer_contacts_item, footer_title_for_contacts, introduction, card, card_topic, type_link});
  })
})
}
})

app.listen(3003, 'localhost')
