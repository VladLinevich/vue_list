<template>
    <div class="table">
          <div class="t__header item">
            <div class="c__item c__number">№</div>
            <div class="c__item c__name">
              <div class="form-group form-group_default-select ">
                <label class="form-group__label">
                  <div class="input-wrap">
                    <select class="default-select" name="state">
                      <option value="AL">Продукт</option>
                      <option value="WY">Продукт 1</option>
                      <option value="WY">Продукт 2</option>
                      <option value="WY">Продукт 3</option>
                    </select>
                  </div>
                </label>
              </div>
            </div>
            <div class="c__item c_arrow">
              <a href="#">Вес/количество</a>
            </div>
            <div class="c__item c__price c_arrow">
              <a href="#">Цена</a>
            </div>
            <div class="c__item c_arrow">
              <a href="#">Оплаты / Загрузки</a>
            </div>
            <div class="c__item c_arrow">
              <a href="#">Станция отправления</a>
            </div>
            <div class="c__item c_arrow">
              <a href="#">Станция назначения</a>
            </div>
          </div>

          <div class="t__body">

            <div class="t__row">
              <div class="c__item c__number">1</div>
              <div class="c__item c__name">
                <p>Стабильный газовый конденсат</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>
            <div class="t__row">
              <div class="c__item c__number">2</div>
              <div class="c__item c__name">
                <p>Дизельное топливо</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>
            <div class="t__row">
              <div class="c__item c__number">3</div>
              <div class="c__item c__name">
                <p>АИ-92 и АИ-95</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>
            <div class="t__row">
              <div class="c__item c__number">11</div>
              <div class="c__item c__name">
                <p>Авиационное топливо или авиакеросин, Бензин, Дизельное топливо</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>
            <div class="t__row">
              <div class="c__item c__number">11</div>
              <div class="c__item c__name">
                <p>Авиационное топливо или авиакеросин, Бензин, Дизельное топливо</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>
            <div class="t__row">
              <div class="c__item c__number">11</div>
              <div class="c__item c__name">
                <p>Авиационное топливо или авиакеросин, Бензин, Дизельное топливо</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>
            <div class="t__row">
              <div class="c__item c__number">11</div>
              <div class="c__item c__name">
                <p>Авиационное топливо или авиакеросин, Бензин, Дизельное топливо</p>
              </div>
              <div class="c__item">
                <p>100 000 т</p>
                <p class="text-small">72 320 т - отгружено</p>
              </div>
              <div class="c__item c__price">21 768 000 руб</div>
              <div class="c__item">13.02.2018 / 24.03.2018</div>
              <div class="c__item">4880 White Parkway Apt. 024</div>
              <div class="c__item">941 Ernser Station Apt. 167</div>
            </div>


          </div>
        </div>
</template>


<script>

    import TableHeader from './TableHeader'


    export default {
    name: 'TableWrap',
    components: {
      TableHeader
    },
    props: {
        msg: String
    }
}
</script>