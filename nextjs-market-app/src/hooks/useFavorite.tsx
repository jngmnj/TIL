import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface UseFavorite {
    productId: string;
    currentUser?: User | null;
}
const useFavorite = ({ productId, currentUser }: UseFavorite) => {
    const router = useRouter();
    
    const hasFavorite = useMemo(() => {
        const list = currentUser?.favoriteIds || [];
        return list.includes(productId);
    }, [currentUser, productId]);

    const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation(); // event bubbling 방지
      console.log("favorite 버튼 클릭");

      if (!currentUser) {
        toast.warning('로그인 후 이용해주세요. ')
        return;
      }

      try {
        let request;

        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${productId}`);
        } else {
          request = () => axios.post(`/api/favorites/${productId}`);
        }

        await request();
        router.refresh(); // 데이터 업뎃후 상태 변경 화면에서 반영해줘야함(next13 추천방법)
        toast.success('성공했습니다. ')
      } catch (err) {
        // console.error(err);
        toast.error('실패했습니다. ')
      }
    };

    return {
        hasFavorite,
        toggleFavorite
    }    
}

export default useFavorite;