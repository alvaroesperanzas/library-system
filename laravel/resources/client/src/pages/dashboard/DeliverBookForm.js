import Autocomplete from '../../presentationals/Autocomplete';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';

const DeliverBookForm = ({
  onValidate,
  onSubmit,
  books,
  users
}) => (
  <Formik
    initialValues={{
      book: {name: ''},
      user: {name: ''},
    }}
    validate={onValidate}
    onSubmit={onSubmit}
  >
    {
      ({
        handleSubmit,
        errors,
        setFieldValue,
        setFieldTouched,
        submitForm,
        values,
      }) => (
        <Form
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="ancho50">
            <label className="title-form">Start typing to search a book</label>
              <Field
                title="Select a book"
                name="book"
                errors={errors}
                items={books}
                onSelect={(_, item) => {
                  setFieldTouched('book', true);
                  setFieldValue('book', item, true);
                }}
                onChange={(e) => {
                  setFieldTouched('book', true);
                  setFieldValue('book', {name: e.target.value}, true);
                }}
                component={Autocomplete}
              />
              <ErrorMessage
                component="span"
                name="book"
              />
            </div>
          </div>
          <div
            className="center padding-space"
          >
            <button
              className="boton"
              type="button"
              onClick={() => {
                setTimeout(submitForm, 100);
              }}
            >
              Deliver a book
            </button>
          </div>
        </Form>   
      )
    }
  </Formik>
)

export default DeliverBookForm;