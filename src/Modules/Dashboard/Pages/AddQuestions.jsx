import React, { useState, useEffect } from 'react';
import {useData} from '../DataContext/DataContext '
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddQuestions() {
    const location = useLocation();
    const { state } = useLocation();
    const questionToEdit = state ?? null;
    const { createQuestion, updateQuestion } = useData();

    const [questionType, setQuestionType] = useState(questionToEdit?.type || "multiple");
    const [content, setContent] = useState(questionToEdit?.content || '');
    const [answers, setAnswers] = useState(questionToEdit?.answers || [
        { content: '' },
        { content: '' },
        { content: '' },
        { content: '' }
    ]);
    const [correctAnswer, setCorrectAnswer] = useState(questionToEdit?.correct_answer_content || '');

    useEffect(() => {
        if (questionToEdit) {
            setContent(questionToEdit.content || '');
            setAnswers(questionToEdit.answers || [{ content: '' }, { content: '' }, { content: '' }, { content: '' }]);
            setCorrectAnswer(questionToEdit.correct_answer?.content || '');
            setQuestionType(questionToEdit.type || "multiple");
        }
    }, [questionToEdit]);

    const handleAnswerChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index].content = value;
        setAnswers(newAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content.trim()) {
            toast.error("⚠️ يجب إدخال نص السؤال!");
            return;
        }

        const filteredAnswers = answers.filter(answer => answer.content.trim());
        
        if (questionType === "multiple" && filteredAnswers.length < 2) {
            toast.error("⚠️ يجب إدخال إجابتين على الأقل!");
            return;
        }
        
        if (questionType === "true_false") {
            if (filteredAnswers.length !== 2 || !filteredAnswers.some(a => a.content === "صح") || !filteredAnswers.some(a => a.content === "خطأ")) {
                toast.error("⚠️ يجب أن تكون الإجابتان فقط: صح وخطأ!");
                return;
            }
        }

        if (!filteredAnswers.some(answer => answer.content === correctAnswer)) {
            toast.error("⚠️ يجب أن تكون الإجابة الصحيحة موجودة ضمن الإجابات!");
            return;
        }

        const questionData = {
            content,
            type: questionType,
            answers: filteredAnswers,
            correct_answer_content: correctAnswer
        };

        try {
            if (questionToEdit) {
                await updateQuestion(questionToEdit.id, questionData);
                toast.success("✅ تم تحديث السؤال بنجاح");
            } else {
                await createQuestion(questionData);
                toast.success("✅ تمت إضافة السؤال بنجاح");
            }
        } catch (error) {
            console.error("❌ خطأ:", error.response?.data || error);
            toast.error("⚠️ حدث خطأ أثناء الحفظ!");
        }
    };

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <ToastContainer />
            <h3 className="text-lg font-semibold mb-4 text-right">
                {questionToEdit ? "تعديل السؤال" : "إضافة سؤال"}
            </h3>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <select 
                    value={questionType} 
                    onChange={(e) => setQuestionType(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 text-right"
                >
                    <option value="multiple">اختيار من متعدد</option>
                    <option value="true_false">صح أو خطأ</option>
                </select>

                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 text-right"
                    placeholder="نص السؤال"
                    required
                />
                {answers.map((answer, index) => (
                    <input
                        key={index}
                        type="text"
                        value={answer.content}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 text-right"
                        placeholder={`الإجابة ${index + 1}`}
                        
                    />
                ))}
                <input
                    type="text"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 text-right"
                    placeholder="الإجابة الصحيحة"
                    required
                />
                <button type="submit" className="bg-green-500 text-white p-2 rounded-lg w-full">
                    {questionToEdit ? "تحديث" : "إضافة"}
                </button>
            </form>
        </div>
    );
}