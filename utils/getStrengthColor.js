import checkPasswordStrength from "@/utils/checkPasswordStrength";

const getStrengthColor = (password) => {
    let score = checkPasswordStrength(password);
    if (score > 80)
        return "whatsapp.500";
    if (score > 60)
        return "messenger.500";
    if (score >= 30)
        return "red.500";

    return "yellow.500";
}

export default getStrengthColor;