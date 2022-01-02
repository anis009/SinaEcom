import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const SignupScreen = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [nameTouch, setNameTouch] = useState(false);
	const [emailTouch, setEmailTouch] = useState(false);
	const [passwordTouch, setPasswordTouch] = useState(false);
	const [confirmPasswordTouch, setConfirmPasswordTouch] = useState(false);
	// const [formIsValid, setFormIsValid] = useState(false);
	const nameIsValid = name.trim() !== "";
	const emailIsValid = email.trim() !== "" && email.includes("@gmail.com");
	const passwordIsValid = password.length >= 4;
	const confirmPasswordIsValid =
		confirmPassword === password && confirmPassword.trim !== "";
	const nameIsInvalid = !nameIsValid && nameTouch;
	const emailIsInvalid = !emailIsValid && emailTouch;
	const passwordIsInvalid = !passwordIsValid && passwordTouch;
	const confirmPasswordIsInvalid =
		!confirmPasswordIsValid && confirmPasswordTouch;

	let formIsValid = false;
	if (
		nameIsValid &&
		emailIsValid &&
		passwordIsValid &&
		confirmPasswordIsValid
	) {
		formIsValid = true;
	} else {
		formIsValid = false;
	}
	const navigate = useNavigate();
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo, error, loading } = userSignup;
	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			console.log(userInfo);
			navigate("/");
		}
	}, [navigate, userInfo]);
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(name, email, password));
	};
	const nameBlurHandler = (e) => {
		setNameTouch(true);
	};
	const emailBlurHandler = (e) => {
		setEmailTouch(true);
	};
	const passwordBlurHandler = (e) => {
		setPasswordTouch(true);
	};

	const confirmPasswordBlurHandler = (e) => {
		setConfirmPasswordTouch(true);
	};

	const nameChange = (e) => {
		setName(e.target.value);
		setNameTouch(true);
	};
	const emailChange = (e) => {
		setEmail(e.target.value);
		setEmailTouch(true);
	};
	const passwordChange = (e) => {
		setPassword(e.target.value);
	};
	const confirmPasswordChange = (e) => {
		setConfirmPassword(e.target.value);
	};
	const classesName =
		!nameIsInvalid && !emailIsInvalid && !passwordIsInvalid
			? "form-controls"
			: "form-controls invalid";
	return (
		<form onSubmit={submitHandler} className="signup-box">
			{loading && <Loader />}
			{error && <Message color="danger">{error}</Message>}
			<div className="form-container">
				<h1>Register</h1>
				<div className={classesName}>
					<label htmlFor="name">Your Name</label>
					<input
						type="text"
						id="name"
						onChange={nameChange}
						value={name}
						onBlur={nameBlurHandler}
					/>
					{nameIsInvalid && (
						<p className="error-text">Name must not be empty.</p>
					)}
				</div>
				<div className={classesName}>
					<label htmlFor="email">Your Email</label>
					<input
						type="email"
						name="email"
						value={email}
						onChange={emailChange}
						onBlur={emailBlurHandler}
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
					/>
					{passwordIsInvalid && (
						<p className="error-text">
							Password must be at least 4 characters.
						</p>
					)}
				</div>
				<div className={classesName}>
					<label htmlFor="email">Your Confirm Password</label>
					<input
						type="password"
						name="password"
						value={confirmPassword}
						onChange={confirmPasswordChange}
						onBlur={confirmPasswordBlurHandler}
					/>
					{confirmPasswordIsInvalid && (
						<p className="error-text">
							Passowrd and Confirm password is not equal.
						</p>
					)}
				</div>
				<div className="form-actions">
					<button type="submit" disabled={!formIsValid}>
						SignUp
					</button>
				</div>
				<span className="pb-2">
					Already have an Account? <Link to="/login">Login</Link>
				</span>
			</div>
		</form>
	);
};

export default SignupScreen;
