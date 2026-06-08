import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchStudents } from "../../redux/students/operations";
import { selectActiveStudentsCount } from "../../redux/students/selectors";
import { Users } from "lucide-react";

export default function ActiveStudentsCounter() {
  const dispatch = useDispatch();
  const activeCount = useSelector(selectActiveStudentsCount);

  useEffect(() => {
    dispatch(searchStudents());
  }, [dispatch]);

  return (
    <div className="bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 rounded-2xl shadow-lg flex items-center justify-between transition-colors duration-500">
      <div>
        <h3 className="text-gray-400 dark:text-gray-500 text-sm font-medium uppercase tracking-wider transition-colors duration-500">
          Активні студенти
        </h3>
        <p className="text-4xl font-extrabold text-green-500 dark:text-green-400 mt-1 transition-colors duration-500">
          {activeCount}
        </p>
      </div>
      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 dark:text-green-400 transition-colors duration-500">
        <Users size={28} />
      </div>
    </div>
  );
}
