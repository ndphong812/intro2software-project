import { Request, Response } from "express";
import { getRepository, getManager  } from "typeorm";
import { User } from "../entities/User";

class AcceptSeller {
  static accept = async (req: Request, res: Response) => {

    const newValues: Partial<User> = req.body;

    //check role != admin
    if (newValues.role === "admin") {
        return res.status(401).json({ status: "failure", message: "Bạn không thể trở thành admin." })
    }

    newValues.role = "seller";

    const acceptUserRepository = await getRepository(User);

    const result = await acceptUserRepository.update(
      { user_id: newValues.user_id },
      newValues,
    );
    if (result.affected === 0) {
      return res.status(401).json({ status: "failure", message: "Không tìm thấy người dùng này." });
    } else {
      return res.status(200).json({ status: "success", message: "Bạn dã đăng ký thành người bán hàng thành công." });
    }

  }
}

export default AcceptSeller;