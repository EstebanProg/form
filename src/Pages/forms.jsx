import React, { useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../components/Header";
import DarkFooter from "../components/Footer";
import { createGlobalStyle } from "styled-components";

// Estilo global con el fondo animado
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
  
  body {
    background-image: url('https://i.gifer.com/33KA.gif');
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    margin: 0;
    padding: 0;
    font-family: 'Merriweather', serif;
    
    @media (max-width: 768px) {
      background: url('https://i.gifer.com/33KA.gif') no-repeat center center fixed;
      background-size: cover;
    }
  }
`;

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 4.710989,
  lng: -74.072092,
};

function FormExample() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const [submitStatus, setSubmitStatus] = useState(null); // "success" | "error"
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [photoTimestamp, setPhotoTimestamp] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "TU_API_KEY_AQUI",
  });

  const schema = yup.object().shape({
    firstName: yup.string().required("El nombre es obligatorio"),
    lastName: yup.string().required("El apellido es obligatorio"),
    email: yup
      .string()
      .email("Ingrese un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    address: yup.string().required("La dirección es obligatoria"),
    idNumber: yup
      .string()
      .matches(/^[0-9]+$/, "La cédula no puede contener letras")
      .required("La cédula es obligatoria"),
    expeditionDate: yup
      .date()
      .required("La fecha de expedición es obligatoria"),
    photo: yup
      .mixed()
      .required("La foto es obligatoria")
      .test(
        "fileSize",
        "El archivo es demasiado grande",
        (value) => value && value.size <= 5000000
      )
      .test(
        "fileType",
        "Solo se permiten imágenes",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
    selectedOption: yup.string().required("Debe seleccionar una opción"),
    terms: yup
      .bool()
      .required("Debe aceptar los términos y condiciones")
      .oneOf([true], "Debe aceptar los términos"),

    phoneNumber: yup
      .string()
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .min(10, "El número debe tener al menos 10 dígitos")
      .max(13, "El número no debe exceder 13 dígitos")
      .required("Este campo es obligatorio"),
  });

  const handleUbicarme = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(pos);
          setError("");
        },
        () => {
          setError("No se pudo obtener tu ubicación");
        }
      );
    }
  }, []);

  return (
    <>
      <GlobalStyle />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
        }}
      >
        <Header />
        <div
          style={{
            flex: 1,
            padding: "20px",
            maxWidth: "800px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Formik
            validationSchema={schema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              phoneNumber: "",
              idNumber: "",
              expeditionDate: "",
              photo: null,
              selectedOption: "",
              terms: false,
            }}
            onSubmit={async (values, { resetForm }) => {
              setLoading(true);
              setSubmitStatus(null);
              try {
                if (!location) {
                  throw new Error(
                    "Debe activar su ubicación antes de enviar el formulario."
                  );
                }

                console.log({ ...values, ubicacion: location });

                // Simular envío
                await new Promise((resolve) => setTimeout(resolve, 1000));

                resetForm();

                // Limpiar input de archivo
                if (fileInputRef.current) {
                  fileInputRef.current.value = "";
                }

                setSubmitStatus("success");
              } catch (error) {
                console.error(error);
                setSubmitStatus("error");
              } finally {
                setLoading(false);
              }
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isValid,
              setFieldValue,
              setTouched,
              handleBlur,
            }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
              >
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      isInvalid={touched.firstName && !!errors.firstName}
                      onBlur={handleBlur}
                      placeholder="Ej: Lucas"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.firstName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      isInvalid={touched.lastName && !!errors.lastName}
                      onBlur={handleBlur}
                      placeholder="Ej: Lopez"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.lastName}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik03">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={touched.email && !!errors.email}
                      onBlur={handleBlur}
                      placeholder="Ej: astrort@gmail.com"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormikPhone">
                    <Form.Label>Número de celular</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phoneNumber"
                      value={values.phoneNumber}
                      onChange={handleChange}
                      isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                      onBlur={handleBlur}
                      placeholder="Ej: 3001234567"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phoneNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik04">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={touched.address && !!errors.address}
                      onBlur={handleBlur}
                      placeholder=" Ej: Calle Reforma #123, Interior 4B....."
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik05">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control
                      type="text"
                      name="idNumber"
                      value={values.idNumber}
                      onChange={handleChange}
                      isInvalid={touched.idNumber && !!errors.idNumber}
                      onBlur={handleBlur}
                      placeholder="Ej: 1025648941"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.idNumber}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik06">
                    <Form.Label>Año de Expedición</Form.Label>
                    <Form.Control
                      type="date"
                      name="expeditionDate"
                      value={values.expeditionDate}
                      onChange={handleChange}
                      isInvalid={
                        touched.expeditionDate && !!errors.expeditionDate
                      }
                      onBlur={handleBlur}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.expeditionDate}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Sube una Foto</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    accept="image/*"
                    capture="environment"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setFieldValue("photo", file);

                      if (file) {
                        setImagePreview(URL.createObjectURL(file));

                        // ⏰ Aquí es donde capturas el momento de la subida
                        const now = new Date().toLocaleString();
                        setPhotoTimestamp(now);
                      } else {
                        setImagePreview(null);
                        setPhotoTimestamp(null);
                      }
                    }}
                    isInvalid={touched.photo && !!errors.photo}
                    onBlur={handleBlur}
                    ref={fileInputRef}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.photo}
                  </Form.Control.Feedback>

                  {imagePreview && (
                    <div className="mt-3">
                      <strong>Vista previa: </strong>
                      <div
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        <img
                          src={imagePreview}
                          alt="Vista previa"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            borderRadius: "10px",
                          }}
                        />
                      </div>

                      {/* 🕒 Aquí mostramos la fecha y hora */}
                      {photoTimestamp && (
                        <div className="text-muted mt-2">
                          <small>Subida el: {photoTimestamp}</small>
                        </div>
                      )}
                    </div>
                  )}
                </Form.Group>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik07">
                    <Form.Label>Selecciona una Unidad</Form.Label>
                    <Form.Control
                      as="select"
                      name="selectedOption"
                      value={values.selectedOption}
                      onChange={handleChange}
                      isInvalid={
                        touched.selectedOption && !!errors.selectedOption
                      }
                      onBlur={handleBlur}
                    >
                      <option value="">Seleccione Unidad...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.selectedOption}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Ubicación: </Form.Label>
                  <div className="mb-2">
                    <Button onClick={handleUbicarme}>Ubicarme</Button>
                  </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={location || defaultCenter}
                      zoom={10}
                    >
                      {location && <Marker position={location} />}
                    </GoogleMap>
                  ) : (
                    <p>Cargando mapa...</p>
                  )}
                </Form.Group>

                {submitStatus === "success" && (
                  <Alert variant="success">Datos enviados correctamente.</Alert>
                )}

                {submitStatus === "error" && (
                  <Alert variant="danger">
                    Hubo un error. Asegúrate de activar tu ubicación.
                  </Alert>
                )}

                <Form.Group className="mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="Aceptar términos y condiciones"
                    onChange={handleChange}
                    isInvalid={touched.terms && !!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    onBlur={handleBlur}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  disabled={!isValid || loading}
                  variant="primary"
                  style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                >
                  {loading ? (
                    <>
                      <Spinner
                        animation="border"
                        size="sm"
                        role="status"
                        className="me-2"
                      />
                      Enviando...
                    </>
                  ) : (
                    "Enviar"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
        <DarkFooter />
      </div>
    </>
  );
}

export default FormExample;
