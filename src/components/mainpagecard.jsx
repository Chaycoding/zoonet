function MainCardSection() {
  return (
    <div className="h-96 w-full grid grid-cols-2  rounded-3xl border-2 border-black">
      <div className=" pt-10 pl-10">
        <h1 className="text-2xl">
          Unveiling Life's Mysteries: Igniting Curiosity
        </h1>
        <p className="mt-10 pr-10 text-lg text-gray-900">
          To ignite a passion for Biological Sciences, we organize engaging
          activities for university students and the community. This will unveil
          the remarkable mysteries hidden within the living world.
        </p>
      </div>
      <div className="flex justify-end items-center overflow-hidden rounded-2xl relative">
        <div className="bg-deerpic scale-x-[-1] h-[31rem] w-[31rem] absolute -right-[15%]  bg-cover bg-right-bottom rounded-full"></div>
      </div>
    </div>
  );
}

export default MainCardSection;
