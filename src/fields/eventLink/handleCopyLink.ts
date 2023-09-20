import { toast } from "react-toastify";

const handleCopyLink = (param: string | number) => {
  navigator.clipboard.writeText(`https://t.me/ConfMerchantBot?start=${param}`);
  toast.success("Ссылка на бота с параметром конференции скопирована в буфер обмена!");
}

export default handleCopyLink;