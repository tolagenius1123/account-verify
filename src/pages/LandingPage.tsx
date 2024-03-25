import login from "@/assets/login.png";
import UserForm from "@/components/UserForm";

const LandingPage = () => {
	return (
		<main className="h-screen w-full flex flex-col md:flex-row font-nanum">
			<section className="w-1/2 h-screen p-2 hidden md:flex items-center justify-around">
				<img src={login} alt="login picture" />
			</section>
			<section className="w-full md:w-1/2 h-screen flex items-center justify-around bg-[#FFF7F1]">
				<UserForm />
			</section>
		</main>
	);
};

export default LandingPage;
