import React from "react";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = ({ rows, inputRef, register, errors }) => {
  const handleUpload = () => {
    inputRef.current.click();
  };

  return (
    <div>
      {rows.map((row, i) => (
        <div key={i} className="row form-rows">
          {row.fields.map((field, i) => (
            <div
              key={i}
              className={`col ${
                row.fields.length > 1 ? "col-md-6 col-sm-12" : "col-12"
              } text-center`}
            >
              {/* Display fields according to their type */}
              {field.fieldType === "image" ? (
                <>
                  <input id={field.fieldId} type="file" hidden ref={inputRef} />
                  <button
                    className="image-btn mb-4"
                    onClick={() => handleUpload()}
                  >
                    <span>
                      <FontAwesomeIcon
                        className="file-icon"
                        icon={faFileArrowUp}
                      />
                    </span>
                    <p className="mb-0">{field.fieldLabel}</p>
                    <p className="mb-0 dimentions">200px by 200px</p>
                  </button>
                </>
              ) : field.fieldType === "dropdown" ? (
                <div className="float-label">
                  <select
                    id={field.fieldId}
                    name={field.fieldLabel}
                    type={field.fieldType}
                    placeholder={field.errorMessage}
                    {...register(`${field.fieldLabel}`, {
                      required: field.isRequired,
                    })}
                  >
                    <option disabled selected>
                      Select
                    </option>
                    {field.options.map((option, i) => (
                      <option key={i} value={option.optionId}>
                        {option.optionName}
                      </option>
                    ))}
                  </select>

                  <label forhtml={field.id}>{field.fieldLabel}</label>
                </div>
              ) : (
                <>
                  <div className="float-label">
                    <input
                      id={field.fieldId}
                      name={field.fieldLabel}
                      type={field.fieldType}
                      placeholder={field.errorMessage}
                      {...register(`${field.fieldLabel}`, {
                        required: field.isRequired,
                        maxLength: field.maxLimit,
                        minLength: field.minLimit,
                      })}
                    />

                    <label forhtml={field.id}>{field.fieldLabel}</label>
                  </div>
                  {errors[field.fieldLabel] ? (
                    <p className="invalid">{field.errorMessage}</p>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Container;
