"use client"
import { Button } from "@/components/ui/button";

interface ButtonLoadMore {
  onclickFunction: () => void;
}
export const ButtonLoadMore = ({ onclickFunction }: ButtonLoadMore) => {
  return (
    <div className="flex justify-center mt-10">
      <Button className="bg-roxo100 hover:bg-sky-500 text-black" onClick={onclickFunction}>
        Carregar Mais
      </Button>
    </div>
  );
};
