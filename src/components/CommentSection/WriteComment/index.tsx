import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import { useInsertNewsCommentMutation } from "../../../redux/NewsSlice";

export interface PageProps {
  customerImage: string,
  newsId: string
  customerId: string
}

export default ({customerImage, customerId, newsId}: PageProps) => {
 
    const [insertNewsComment, { isLoading: updateIsLoading, error }] =
    useInsertNewsCommentMutation();
    return (
    <Formik
    initialValues={{
      comment: '',
    }}
    // validationSchema={userSettingsSchema}
    onSubmit={async ({ comment }) => {
        insertNewsComment({customer_id: customerId, newsId: newsId, comment: comment})
    }}
  >
    {(formik) => {
      const {
        values,
        handleChange,
        handleSubmit,
        isValid,
        dirty,
      } = formik;

      return (
        <form onSubmit={handleSubmit}>
    <div className="write-comment flex">
      <div>
        <img
          src={customerImage}
          className="object-cover rounded-full w-[44px] h-[44px] object-center "
        />
      </div>
      <div className="ml-[20px] flex-1">
        <input
          placeholder="Hozzászólás írása..."
          type="text"
          value={values.comment}
          name={"comment"}
          id={"comment"}
          onChange={handleChange}
          className="placeholder-light-white
            border-2 border-transparent grey-linear-gradient
            leading-[18px] px-3.5 py-3 rounded-l-md focus:outline-0 outline-none 
            text-white
            w-full 
            focus:border-2 focus:border-gray-500  focus:shadow-input focus:border-light-grey"
        />
      </div>
      <div>
        <button className="w-[44px] h-[44px] comment-btn" type="submit">
          <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
        </button>
      </div>
    </div>
    </form>
        );
      }}
    </Formik>
  );
};
