import React, { useState } from "react";
import { Eye, EyeOff, Zap, ArrowRight, CircleCheck } from "lucide-react";
import styles from "./Signup.module.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const mobile = e.target.mobile.value;

    setMessage("");

    // validations
    if (!name || !email || !password || !mobile) {
      setMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    if (!agreed) {
      setMessage("You must accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://nextrade-backend-8bec.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          mobile,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful ✔️");

      // clear form
      e.target.reset();
      setAgreed(false);

      // optional redirect after 1 sec
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setMessage("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.leftPanel}>
        <div className={styles.leftContent}>
          <div className={styles.brand}>
            <span className={styles.brandName}>terminal</span>
            <span className={styles.brandTag}>NexTrade</span>
          </div>

          <h2 className={styles.tagline}>Join the future of retail trading.</h2>

          <div className={styles.speedCard}>
            <div>
              <p className={styles.cardLabel}>EXECUTION SPEED</p>
              <p className={styles.speedValue}>0.01s</p>
            </div>
            <Zap className={styles.zapIcon} size={28} />
          </div>

          <p className={styles.footerText}>
            Institutional-grade infrastructure for modern traders.
          </p>
        </div>
      </div>

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <h1 className={styles.formTitle}>Create your terminal account</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* NAME */}
            <input
              name="name"
              placeholder="Full Name"
              className={styles.input}
            />

            {/* EMAIL */}
            <input name="email" placeholder="Email" className={styles.input} />

            {/* MOBILE */}
            <input
              name="mobile"
              placeholder="Mobile Number"
              className={styles.input}
            />

            {/* PASSWORD */}
            <div className={styles.passwordWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className={styles.input}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* CONFIRM */}

            <div className={styles.passwordWrapper}>
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className={styles.input}
              />

              <button
                type="button"
                className={styles.eyeButton}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* TERMS */}
            <label className={styles.termsRow}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
              />
              I agree to Terms & Privacy Policy
            </label>

            {/* MESSAGE */}
            {message && <p className={styles.message1}>{message}</p>}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "Creating..." : "Create Account"}
              <ArrowRight size={18} />
            </button>

            {/* LOGIN LINK */}
            <p className={styles.loginText}>
              Already have account? <a href="/login">Login</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
