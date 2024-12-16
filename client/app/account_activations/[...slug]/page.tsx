"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import accountActivationApi from "@/components/shared/api/accountActivationApi";
import flashMessage from "@/components/shared/flashMessages";

// Định nghĩa kiểu PageProps cho params
interface PageProps {
  params: {
    slug: string[];
  };
}

const Edit = ({ params }: PageProps) => {
  const router = useRouter();
  const { slug } = params;

  // Phân tách slug thành activation_token và email
  const { activation_token, email } =
    slug.length === 2
      ? { activation_token: slug[0], email: decodeURIComponent(slug[1]) }
      : { activation_token: "", email: "" };

  useEffect(() => {
    if (!activation_token || !email) {
      // Nếu thiếu token hoặc email -> redirect về trang chính
      flashMessage("error", "Invalid activation link");
      router.push("/");
      return;
    }

    // Gọi API kích hoạt tài khoản
    accountActivationApi
      .update(activation_token, email)
      .then((response) => {
        flashMessage("success", "The account has been activated. Please log in.");
        setTimeout(() => {
          if (response.user) {
            router.push("/login");
          } else {
            router.push("/");
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("Activation Error:", error);
        flashMessage("error", "Account activation failed. Please try again.");
        router.push("/");
      });
  }, [activation_token, email, router]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Activating your account...</h1>
      <p>Please wait while we process your activation.</p>
    </div>
  );
};

export default Edit;
