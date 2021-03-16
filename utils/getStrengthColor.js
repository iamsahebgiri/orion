import checkPasswordStrength from "@/utils/checkPasswordStrength";

const getStrengthColor = (password) => {
    let score = checkPasswordStrength(password);
    if (score > 80)
        return "whatsapp.500";
    else if (score > 60)
        return "yellow.500";
    else if (score >= 30)
        return "red.500";
    else 
        return "red.600";
}

export default getStrengthColor;