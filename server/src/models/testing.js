const Bcryptjs=require("bcryptjs");
const test = async () => {
    const saltRound = await Bcryptjs.genSalt(10);
    const hash_password = await Bcryptjs.hash("abhay",saltRound);
    const isPasswordValid = await Bcryptjs.compare("abhay", hash_password);
    console.log(isPasswordValid);
    const TodayDate = new Date;
    console.log(TodayDate.getDate());
}
test();
