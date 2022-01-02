import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_REGISTER_RESET } from "../constants/userConstants";

const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userSignup = useSelector((state) => state.userSignup);
	const { userInfo } = userSignup;
	const logoutHandler = () => {
		dispatch({
			type: USER_REGISTER_RESET,
		});
		window.location.href = "/login";
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link className="navbar-brand px-2" to="/">
				SinaEcom
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNavDropdown"
				aria-controls="navbarNavDropdown"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarNavDropdown">
				<form className="search-box">
					<input type="search" name="" id="" placeholder="search..." />
					<button type="">search</button>
				</form>
				<ul className="navbar-nav ml-auto">
					<li className="nav-item">
						<a className="nav-link" href="!#" style={{ display: "flex" }}>
							<span>
								<i
									className="fas fa-cart-arrow-down"
									style={{ fontSize: "20px" }}
								></i>
							</span>
							Cart
						</a>
					</li>

					{!userInfo ? (
						<li className="nav-item mr-4">
							<Link
								className="nav-link"
								to="/login"
								style={{ display: "flex" }}
							>
								<span>
									<i
										className="fas fa-sign-in-alt"
										style={{ fontSize: "20px" }}
									></i>
								</span>
								SignIn
							</Link>
						</li>
					) : (
						<li className="nav-item dropdown mr-5">
							<a
								className="nav-link dropdown-toggle"
								href="!#"
								id="navbarDropdownMenuLink"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								{userInfo.name}
							</a>
							<div
								className="dropdown-menu"
								aria-labelledby="navbarDropdownMenuLink"
							>
								<a className="dropdown-item" href="!#">
									Profile
								</a>
								<p
									className="dropdown-item"
									onClick={logoutHandler}
									style={{ cursor: "pointer" }}
								>
									Logout
								</p>
							</div>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
