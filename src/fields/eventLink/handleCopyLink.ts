import { toast } from "react-toastify";

const handleCopyLink = (e: React.SyntheticEvent, param: string | number) => {
  console.log('param', param);
  navigator.clipboard.writeText(`https://t.me/ConfMerchantBot?start=${param}`);
  toast.success("Ссылка на бота с параметром конференции скопирована в буфер обмена!");
}

export default handleCopyLink;