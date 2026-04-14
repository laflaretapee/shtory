import { useLeadForm } from '../hooks/useLeadForm'

export function LeadFormSection() {
  const { fields, errors, submitted, handleChange, handleSubmit } = useLeadForm()

  return (
    <section className="section section-warm" id="lead-form">
      <div className="container lead-layout">
        <div className="lead-copy">
          <p className="eyebrow eyebrow-dark">Заявка</p>
          <h2>Закажите расчёт стоимости штор</h2>
          <p>
            Оставьте заявку, и мы свяжемся с вами, чтобы помочь подобрать шторы под
            ваш интерьер, бюджет и формат окна.
          </p>
          <ul className="feature-list">
            <li>Шторы на заказ Раевка и Раевский</li>
            <li>Тюль, портьеры, рулонные и римские шторы</li>
            <li>Замер, подбор ткани и установка под ключ</li>
          </ul>
        </div>

        <form className="lead-form" noValidate onSubmit={handleSubmit}>
          <label>
            <span>Имя</span>
            <input
              aria-invalid={Boolean(errors.name)}
              name="name"
              type="text"
              placeholder="Как к вам обращаться"
              value={fields.name}
              onChange={handleChange}
            />
            {errors.name ? <span className="field-error">{errors.name}</span> : null}
          </label>

          <label>
            <span>Телефон</span>
            <input
              aria-invalid={Boolean(errors.phone)}
              name="phone"
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={fields.phone}
              onChange={handleChange}
            />
            {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
          </label>

          <label>
            <span>Что нужно</span>
            <select name="request" value={fields.request} onChange={handleChange}>
              <option>Шторы</option>
              <option>Тюль</option>
              <option>Рулонные</option>
              <option>Римские</option>
              <option>Карнизы</option>
              <option>Консультация</option>
            </select>
          </label>

          <label>
            <span>Комментарий</span>
            <textarea
              name="comment"
              rows="4"
              placeholder="Например: нужны шторы в спальню, интересует выезд на замер в Раевский"
              value={fields.comment}
              onChange={handleChange}
            />
          </label>

          <button className="button" type="submit">
            Получить расчёт бесплатно
          </button>

          {submitted ? (
            <p className="form-success" role="status">
              Спасибо! Мы свяжемся с вами в течение дня. Ждите звонка.
            </p>
          ) : null}

          <p className="form-note">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных. Мы не
            передаём ваши данные третьим лицам.
          </p>
        </form>
      </div>
    </section>
  )
}
