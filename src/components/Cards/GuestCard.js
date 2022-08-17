import React, { useState } from "react";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import "../../scss/GuestCard.scss";
import styled from "styled-components";

const GuestCard = () => {
	const [adultCounter, setAdultCounter] = useState(0);
	const [childrenCounter, setChildrenCounter] = useState(0);
	const [infantCounter, setInfantCounter] = useState(0);

	const incrementAdult = () => setAdultCounter(adultCounter + 1);
	const incrementChildren = () => setChildrenCounter(childrenCounter + 1);
	const incrementInfant = () => setInfantCounter(infantCounter + 1);

	const decrementAdult = () => {
		if (adultCounter === 0) {
			setAdultCounter(0);
		} else {
			setAdultCounter(adultCounter - 1);
		}
	};

	const decrementChildren = () => {
		if (childrenCounter === 0) {
			setChildrenCounter(0);
		} else {
			setChildrenCounter(childrenCounter - 1);
		}
	};

	const decrementInfant = () => {
		if (infantCounter === 0) {
			setInfantCounter(0);
		} else {
			setInfantCounter(infantCounter - 1);
		}
	};
	return (
		<div className=" bg-white rounded-[10px] absolute top-[75px] -left-4 md:left-4 w-[280px] md:w-80 pt-4 pb-8 pl-7 pr-4">
			<DropDownIcon className="absolute -top-4 left-4"></DropDownIcon>
			<div className="grid grid-cols-1 divide-y divide-[#DBDBDB]">
				<div className="mb-5">
					<div className="flex justify-between">
						<div>
							<h1 className="font-poppins text-sm text-black">Adults</h1>
							<small className="text-xs font-poppins text-[#8F8F8F]">
								Ages 13 and above
							</small>
						</div>
						<div className="flex items-center">
							<MinusCircleIcon
								className="h-7 w-7 cursor-pointer font-poppins text-sm text-[#046FA7]"
								onClick={decrementAdult}
							/>
							<span className="mx-4 text-[#8F8F8F]">{adultCounter}</span>
							<PlusCircleIcon
								className="h-7 w-7 cursor-pointer font-poppins text-sm text-[#046FA7]"
								onClick={incrementAdult}
							/>
						</div>
					</div>
					<div className="flex justify-between mt-6 mb-7">
						<div>
							<h1 className="font-poppins text-sm text-black">Children</h1>
							<small className="text-xs font-poppins text-[#8F8F8F]">
								Ages 2 to 12
							</small>
						</div>
						<div className="flex items-center">
							<MinusCircleIcon
								className="h-7 w-7 cursor-pointer font-poppins text-sm text-[#046FA7]"
								onClick={decrementChildren}
							/>
							<span className="mx-4 text-[#8F8F8F]">{childrenCounter}</span>
							<PlusCircleIcon
								className="h-7 w-7 cursor-pointer font-poppins text-sm text-[#046FA7]"
								onClick={incrementChildren}
							/>
						</div>
					</div>
					<div className="flex justify-between">
						<div>
							<h1 className="font-poppins text-sm text-black">Infants</h1>
							<small className="text-xs font-poppins text-[#8F8F8F]">
								Below Age 2
							</small>
						</div>
						<div className="flex items-center ">
							<MinusCircleIcon
								className="h-7 w-7 cursor-pointer font-poppins text-sm text-[#046FA7]"
								onClick={decrementInfant}
							/>
							<span className="mx-4 text-[#8F8F8F]">{infantCounter}</span>
							<PlusCircleIcon
								className="h-7 w-7 cursor-pointer font-poppins text-sm text-[#046FA7]"
								onClick={incrementInfant}
							/>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between pt-5">
					<p className="text-sm font-poppins">Are you traveling with pets?</p>
					<div id="switch-btn">
						<label class="switch">
							<input id="checkbox" type="checkbox" />
							<span class="slider"></span>
						</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GuestCard;

const DropDownIcon = styled.div`
	height: 0;
	width: 0;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-bottom: 20px solid #fff;
`;
