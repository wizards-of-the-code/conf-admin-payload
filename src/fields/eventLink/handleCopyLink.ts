import { toast } from "react-toastify";
import unsecuredCopyToClipboard from "../../utils/unsecuredCopyToClipboard";

const handleCopyLink = (e: React.SyntheticEvent, param: string | number) => {
  // navigator.clipboard.writeText(`https://t.me/ConfMerchantBot?start=${param}`);
  unsecuredCopyToClipboard(`https://t.me/ConfMerchantBot?start=${param}`);
  toast.success("Ссылка на бота с параметром конференции скопирована в буфер обмена!");
}

export default handleCopyLink;