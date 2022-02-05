import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";
import Loader from "react-spinners/RingLoader";
import Message from "../components/Message";

const SigninScreen = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailTouch, setEmailTouch] = useState(false);
	const [passwordTouch, setPasswordTouch] = useState(false);
	const emailIsValid = email.trim() !== "" && email.includes("@gmail.com");
	const passwordIsValid = password.length >= 4;
	const emailIsInvalid = !emailIsValid && emailTouch;
	const passwordIsInvalid = !passwordIsValid && passwordTouch;
	const navigate = useNavigate();
	const userLogin = useSelector((state) => state.userLogin);
	const { error, loading, success } = userLogin;
	const dispatch = useDispatch();

	useEffect(() => {
		if (success) {
			window.location.href = "/";
		}
	}, [success, navigate]);

	let formIsValid = false;
	if (emailIsValid && passwordIsValid) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};

	const emailBlurHandler = (e) => {
		setEmailTouch(true);
	};
	const passwordBlurHandler = (e) => {
		setPasswordTouch(true);
	};

	const emailChange = (e) => {
		setEmail(e.target.value);
		setEmailTouch(true);
	};
	const passwordChange = (e) => {
		setPassword(e.target.value);
	};

	const classesName =
		!emailIsInvalid && !passwordIsInvalid
			? "form-controls"
			: "form-controls invalid";
	return (
		<>
			<form onSubmit={submitHandler} className="signup-box">
				{loading && <Loader />}
				<div className="form-container">
					<h1 className="text-2xl capitalize">Login</h1>
					{error && <Message color="danger">{error}</Message>}
					<div className={classesName}>
						<label htmlFor="email">Your Email</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={emailChange}
							onBlur={emailBlurHandler}
							placeholder="your email..."
							className="border"
						/>
						{emailIsInvalid && (
							<p className="error-text">Please give correct email.</p>
						)}
					</div>
					<div className={classesName}>
						<label htmlFor="email">Your Password</label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={passwordChange}
							onBlur={passwordBlurHandler}
							placeholder="your password...."
							className="border"
						/>
						{passwordIsInvalid && (
							<p className="error-text">
								Password must be at least 4 characters.
							</p>
						)}
					</div>

					<div className="form-actions">
						<button type="submit" disabled={!formIsValid}>
							LogIn
						</button>
					</div>
					<span className="pb-3">
						Create an Account{" "}
						<Link to="/signup" className="text-indigo-500">
							Register
						</Link>
					</span>
				</div>
			</form>
		</>
	);
};

export default SigninScreen;
