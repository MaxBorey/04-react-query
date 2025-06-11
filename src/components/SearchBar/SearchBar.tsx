import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";
import type { SearchBarProps } from '../../types/types';

const SearchSchema = Yup.object().shape({
  query: Yup.string().trim().required("Please enter your search query."),
});

export default function SearchBar({ onSubmit }: SearchBarProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={{ query: "" }}
          validationSchema={SearchSchema}
          onSubmit={(values, { resetForm }) => {
            const trimmedQuery = values.query.trim();
            if (!trimmedQuery) {
              toast.error("Please enter your search query.");
              return;
            }
            onSubmit(trimmedQuery);
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form className={styles.form}>
              <Field
                className={styles.input}
                type="text"
                name="query"
                autoComplete="off"
                placeholder="Search movies..."
                autoFocus
              />
              <button className={styles.button} type="submit">
                Search
              </button>
              {errors.query && touched.query && (
                <div style={{ color: "crimson", marginTop: 6, fontSize: 14 }}>
                  {errors.query}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </header>
  );
}
