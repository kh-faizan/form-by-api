import React, { useEffect, useState, useRef } from "react";
import { getForm } from "../redux/actions/form.actions";
import { connect } from "react-redux";
import Container from "../components/Container";
import { useForm } from "react-hook-form";

const FormView = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(); // Using react-hook-form to present data

  const [form, setForm] = useState([]);
  const inputRef = useRef(); // Ref for input type file

  // Function to show the form data in console
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    // Run a function to fetch API
    props.getForm();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setForm(props.form?.result.sections);
    // eslint-disable-next-line
  }, [props.form]);
  
  return (
    <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
      {form?.map((section, index) => (
        <div key={index} className="section-container">
          <h5 className="heading">{section.sectionTitle}</h5>
          <Container
            rows={section.containers}
            inputRef={inputRef}
            register={register}
            errors={errors}
          />
        </div>
      ))}
      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

const mapStateToProps = (state) => ({
  form: state.form,
  err: state.form.err,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getForm: () => {
      dispatch(getForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormView);
