import {
  useState,
} from "react";


/* =========================================================
   API
========================================================= */

const API_URL =
  "http://localhost:5000/api/admin/verify-passkey";


/* =========================================================
   COMPONENT
========================================================= */

function AdminPasskeyModal({
  onConfirm,
  onCancel,
}) {

  const [passkey, setPasskey] =
    useState("");


  const [error, setError] =
    useState("");


  const [verifying, setVerifying] =
    useState(false);


  /* =======================================================
     VERIFY PASSKEY
  ======================================================= */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setError("");


      if (
        !passkey
      ) {

        setError(
          "Please enter the admin passkey."
        );

        return;

      }


      const adminToken =
        localStorage.getItem(
          "adminToken"
        );


      if (!adminToken) {

        setError(
          "Your admin session has expired. Please log in again."
        );

        return;

      }


      try {

        setVerifying(true);


        /* -------------------------------------------------
           SEND PASSKEY TO BACKEND
        ------------------------------------------------- */

        const response =
          await fetch(
            API_URL,
            {
              method:
                "POST",

              headers: {

                "Content-Type":
                  "application/json",

                "Accept":
                  "application/json",

                Authorization:
                  `Bearer ${adminToken}`,

              },

              body:
                JSON.stringify({

                  passkey:
                    passkey,

                }),

            }
          );


        /* -------------------------------------------------
           READ RESPONSE
        ------------------------------------------------- */

        const data =
          await response.json();


        /* -------------------------------------------------
           FAILURE
        ------------------------------------------------- */

        if (
          !response.ok
        ) {

          throw new Error(
            data.message ||
            "Incorrect passkey."
          );

        }


        /* -------------------------------------------------
           SUCCESS
        ------------------------------------------------- */

        if (
          data.verified !==
          true
        ) {

          throw new Error(
            "Passkey verification failed."
          );

        }


        /* -------------------------------------------------
           TELL PARENT TO SAVE
        ------------------------------------------------- */

        onConfirm();

      } catch (err) {

        console.error(
          "Passkey verification error:",
          err
        );


        setError(
          err.message ||
          "Unable to verify passkey."
        );

      } finally {

        setVerifying(false);

      }

    };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div
      className="
        admin-passkey-overlay
      "
      onClick={
        verifying
          ? undefined
          : onCancel
      }
    >

      <div
        className="
          admin-passkey-modal
        "
        onClick={(event) =>
          event.stopPropagation()
        }
      >

        <div className="
          admin-passkey-icon
        ">
          🔐
        </div>


        <h2>
          Confirm Changes
        </h2>


        <p>
          Enter the admin passkey to save
          your changes to the website.
        </p>


        <form
          onSubmit={
            handleSubmit
          }
        >

          <label>
            Admin Passkey
          </label>


          <input
            type="password"

            value={
              passkey
            }

            onChange={(event) =>
              setPasskey(
                event.target.value
              )
            }

            placeholder="Enter passkey"

            autoFocus

            disabled={
              verifying
            }

            autoComplete="off"

          />


          {error && (

            <div className="
              admin-passkey-error
            ">
              {error}
            </div>

          )}


          <div className="
            admin-passkey-actions
          ">

            <button
              type="button"

              className="
                admin-passkey-cancel
              "

              onClick={
                onCancel
              }

              disabled={
                verifying
              }
            >
              Cancel
            </button>


            <button
              type="submit"

              className="
                admin-passkey-confirm
              "

              disabled={
                verifying
              }
            >

              {verifying
                ? "Verifying..."
                : "Confirm & Save"}

            </button>

          </div>

        </form>

      </div>


      <style>{`

        .admin-passkey-overlay {

          position: fixed;

          inset: 0;

          z-index: 9999;

          display: flex;

          align-items: center;

          justify-content: center;

          padding: 20px;

          background:
            rgba(
              6,
              20,
              38,
              0.58
            );

          backdrop-filter:
            blur(5px);

        }


        .admin-passkey-modal {

          width: 100%;

          max-width: 420px;

          padding: 32px;

          background: #ffffff;

          border-radius: 18px;

          box-shadow:
            0 25px 70px
            rgba(
              0,
              0,
              0,
              0.22
            );

          box-sizing: border-box;

        }


        .admin-passkey-icon {

          width: 54px;

          height: 54px;

          display: flex;

          align-items: center;

          justify-content: center;

          margin-bottom: 18px;

          border-radius: 14px;

          background: #eef5fb;

          font-size: 25px;

        }


        .admin-passkey-modal h2 {

          margin: 0 0 8px;

          color: #0b2e59;

          font-size: 1.5rem;

        }


        .admin-passkey-modal p {

          margin: 0 0 22px;

          color: #687384;

          line-height: 1.6;

          font-size: 0.92rem;

        }


        .admin-passkey-modal label {

          display: block;

          margin-bottom: 8px;

          color: #0b2e59;

          font-size: 0.9rem;

          font-weight: 700;

        }


        .admin-passkey-modal input {

          width: 100%;

          box-sizing: border-box;

          min-height: 50px;

          padding: 12px 14px;

          border: 1px solid #d7e1eb;

          border-radius: 10px;

          outline: none;

          font: inherit;

        }


        .admin-passkey-modal input:focus {

          border-color:
            #0b2e59;

          box-shadow:
            0 0 0 4px
            rgba(
              11,
              46,
              89,
              0.08
            );

        }


        .admin-passkey-error {

          margin-top: 10px;

          padding: 10px 12px;

          border-radius: 8px;

          background: #fff1f0;

          color: #c62828;

          font-size: 0.85rem;

          line-height: 1.5;

        }


        .admin-passkey-actions {

          display: flex;

          justify-content: flex-end;

          gap: 10px;

          margin-top: 22px;

        }


        .admin-passkey-cancel,
        .admin-passkey-confirm {

          padding: 11px 17px;

          border-radius: 9px;

          font: inherit;

          font-weight: 700;

          cursor: pointer;

        }


        .admin-passkey-cancel {

          border:
            1px solid #d7e1eb;

          background: #ffffff;

          color: #687384;

        }


        .admin-passkey-confirm {

          border:
            2px solid #0b2e59;

          background: #0b2e59;

          color: #ffffff;

        }


        .admin-passkey-confirm:hover {

          background: #ffd700;

          border-color: #ffd700;

          color: #0b2e59;

        }


        .admin-passkey-cancel:disabled,
        .admin-passkey-confirm:disabled {

          opacity: 0.7;

          cursor: not-allowed;

        }


        @media (
          max-width: 500px
        ) {

          .admin-passkey-modal {

            padding: 24px;

          }


          .admin-passkey-actions {

            flex-direction:
              column;

          }


          .admin-passkey-cancel,
          .admin-passkey-confirm {

            width: 100%;

          }

        }

      `}</style>

    </div>

  );

}


export default AdminPasskeyModal;