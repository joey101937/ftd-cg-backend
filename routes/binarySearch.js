import { binarySearch } from "../Services/calculationService";


export const binarySearchHandler = async (req, res) => {
    const { body } = req;
    const {items, target} = body;
    
    return res.json(binarySearch(items, target));
}
