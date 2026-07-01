import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Lock as LockIcon,
  Users,
} from "lucide-react";

import logo from "./Image/logo.png";
import styles from "./Login.module.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("https://nextrade-backend-8bec.onrender.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ SAVE TOKEN (CRITICAL FIX)
      localStorage.setItem("token", data.token);

      // SAFE USER OBJECT
      const safeUser = {
        _id: data.user?._id || "",
        name: data.user?.name || "",
        email: data.user?.email || "",
        mobile: data.user?.mobile || "Not set",
        createdAt: data.user?.createdAt || "",
      };

      localStorage.setItem("user", JSON.stringify(safeUser));

      setMessage("Login successful ✔");

      setTimeout(() => {
        navigate("/dashboard");
      }, 400);
    } catch (err) {
      setError("Backend not reachable");
    } finally {
      setLoading(false);
    }
  };

  const trustList = [
    { id: 1, icon: <ShieldCheck size={16} />, words: "SEBI Registered" },
    { id: 2, icon: <LockIcon size={16} />, words: "Bank-grade Security" },
    { id: 3, icon: <Users size={16} />, words: "500k+ Active Traders" },
  ];

  return (
    <div className={styles.page}>
      {/* LEFT PANEL */}
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <img src={logo} alt="logo" className={styles.logo} />
          <span className={styles.brandName}>NexTrade</span>
        </div>

        <div className={styles.leftContent}>
          <h1 className={styles.headline}>
            Smart trading <br /> starts here
          </h1>

          <p className={styles.subtext}>
            Access institutional-grade tools and real-time market insights.
          </p>

          <ul className={styles.trustList}>
            {trustList.map((item) => (
              <li key={item.id} className={styles.trustItem}>
                <span className={styles.trustIcon}>{item.icon}</span>
                {item.words}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrap}>
          <h2 className={styles.welcome}>Welcome Back</h2>
          <p className={styles.welcomeSub}>Log in to manage your portfolio</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* EMAIL */}
            <div className={styles.field}>
              <label className={styles.label}>Email Address</label>

              <div className={styles.inputWrap}>
                <Mail size={16} className={styles.inputIcon} />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className={styles.field}>
              <label className={styles.label}>Password</label>

              <div className={styles.inputWrap}>
                <Lock size={16} className={styles.inputIcon} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  placeholder="••••••••"
                />

                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* REMEMBER */}
            <label className={styles.rememberRow}>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className={styles.checkbox}
              />
              Remember me
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              className={styles.loginBtn}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
              <ArrowRight size={16} />
            </button>

            
            <p className={styles.signupText}>
              Don't have an account?
              <a href="/signup">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;