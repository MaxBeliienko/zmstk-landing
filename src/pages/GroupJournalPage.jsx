import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchQuestionTopics } from "../redux/tests/operations";
import { selectQuestionTopics } from "../redux/tests/selectors";
import axios from "axios";

import GroupJournalHeader from "../components/admin/GroupJournalHeader";
import GroupJournalControls from "../components/admin/GroupJournalControls";
import GroupJournalView from "../components/admin/GroupJournalView";
import GroupJournalModal from "../components/modal/GroupJournalModal";

export default function GroupJournalPage() {
  const dispatch = useDispatch();
  const topicsFromServer = useSelector(selectQuestionTopics) || []; // Отримуємо сирі теми з бази

  const [viewType, setViewType] = useState("table");
  const [searchQuery, setSearchQuery] = useState("");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    dispatch(fetchQuestionTopics());

    const fetchJournalData = async () => {
      try {
        const res = await axios.get(
          "https://zmstk-back.onrender.com/api/tests/journal"
        );
        setGroups(res.data || []);
      } catch (error) {
        console.error("Помилка завантаження даних журналу груп:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJournalData();
  }, [dispatch]);

  // 🌟 ЦЕНТРАЛІЗОВАНА ЛОГІКА ПАРСИНГУ ТА СОРТУВАННЯ ТЕМ
  const parseTopicNumber = (topicStr) => {
    if (!topicStr) return null;
    const match = topicStr.match(/Тема\s+([0-9.]+)/i);
    return match ? match[1] : null;
  };

  const validThemes = topicsFromServer
    .map((topic) => {
      const name = topic._id;
      return {
        fullName: name,
        displayNum: parseTopicNumber(name),
      };
    })
    .filter((item) => {
      if (!item.displayNum) return false;
      const mainNumber = parseFloat(item.displayNum);
      return mainNumber < 40; // Строго менше Теми 40
    })
    .sort((a, b) =>
      a.displayNum.localeCompare(b.displayNum, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    );

  const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-6">
        <GroupJournalHeader />

        <GroupJournalControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewType={viewType}
          setViewType={setViewType}
        />

        {loading ? (
          <div className="p-12 text-center text-sm font-semibold text-gray-400 animate-pulse">
            Синхронізація та завантаження списків груп з бази даних...
          </div>
        ) : filteredGroups.length === 0 ? (
          <div className="p-12 text-center text-sm text-gray-400 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            Жодної групи за запитом{" "}
            <span className="font-bold text-amber-500">"{searchQuery}"</span> не
            знайдено.
          </div>
        ) : (
          <GroupJournalView
            viewType={viewType}
            groups={filteredGroups}
            onSelectGroup={setSelectedGroup}
            // 🌟 Передаємо відсортовані теми у відображення списку для модалки ДЗ
            validThemes={validThemes}
          />
        )}

        {/* 🌟 Передаємо вже очищені й готові теми замість сирих */}
        <GroupJournalModal
          isOpen={selectedGroup !== null}
          onClose={() => setSelectedGroup(null)}
          groupData={selectedGroup}
          validThemes={validThemes}
        />
      </div>
    </div>
  );
}
