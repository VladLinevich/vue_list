<template>
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
</template>

<script>

export default {
  name: 'TableHeader'
}
    
</script>
