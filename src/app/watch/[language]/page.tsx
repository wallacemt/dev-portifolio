import { getOwner } from "@/services/ownerApi";
import { OwnerResponse } from "@/types/owner";

export default async function HomePage() {
  let owner: OwnerResponse = {
    id: "",
    name: "",
    about: "",
    email: "",
    birthDate: new Date(),
    occupation: "",
    avatar: "",
    cvLinkEN: "",
    cvLinkPT: "",
  };
  try {
    owner = await getOwner();
  } catch (e) {
    console.log(e);
  }
  return (
  <div className="text-white text-2xl">
    Bem-vindo:
    <p>OWNER: {JSON.stringify(owner)}</p>
    </div>)
}
