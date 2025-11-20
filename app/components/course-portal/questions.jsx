import {
  deleteComment,
  deleteQuestion,
  fetchComments,
  fetchQuestions,
  markSolution,
  pinQuestion,
  postComment,
  postQuestion,
} from "@/app/actions/questions-data";
import {
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowLongLeftIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  EyeDropperIcon,
  PaperClipIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Suspense, useEffect, useState } from "react";
import { timeAgo } from "../utilities/time_ago";
import Loading from "@/app/loading";
import { Pin } from "../style/icons";

export default function Questions({ course, user }) {
  const [quesList, setList] = useState({ data: [] });
  const [qTab, setQTab] = useState("latest");
  const [modal, setModal] = useState("list");
  const [question, setQuestion] = useState(null);
  const [refreshQList, setRefreshQList] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getQues(course) {
      const quest = await fetchQuestions(course.questions_tag, qTab, user.id);
      setList(quest);
      setLoading(false);
    }
    setLoading(true);
    getQues(course);
  }, [qTab, refreshQList]);

  if (modal === "list") {
    return (
      <div className=" flex flex-col h-full">
        <div>
          <div className="p-5 mb-8 w-full">
            <h1 className="text-5xl">Course Questions</h1>
          </div>
          <div className="p-5 flex justify-between items-center border-b border-borderGrey/50">
            <div>
              <button
                className={`font-medium ${
                  qTab == "latest" ? "text-white" : "text-greyText"
                }`}
                onClick={() => setQTab("latest")}
              >
                Latest
              </button>
              <button
                className={`font-medium ${
                  qTab == "unanswered" ? "text-white" : "text-greyText"
                } ml-4`}
                onClick={() => setQTab("unanswered")}
              >
                Unanswered
              </button>
              <button
                className={`font-medium ${
                  qTab == "you" ? "text-white" : "text-greyText"
                } ml-4`}
                onClick={() => setQTab("you")}
              >
                You
              </button>
            </div>
            <div>
              <button
                className="px-6 md:px-8 h-10 bg-primary rounded-full text-sm text-white hover:bg-primary/70"
                onClick={() => setModal("add")}
              >
                Ask question
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-5">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="p-5 overflow-y-scroll grow">
            <div className=" grid gap-4">
              {quesList.data.length > 0 ? (
                quesList.data.map((q, i) => {
                  return (
                    <Question
                      question={q}
                      key={i}
                      setQuestion={setQuestion}
                      setModal={setModal}
                    />
                  );
                })
              ) : (
                <p>No questions for this selection exist.</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  } else if (modal === "add") {
    return (
      <>
        <QuestionModal
          setModal={setModal}
          user={user}
          course={course}
          setRefreshQList={setRefreshQList}
        />
      </>
    );
  } else if (modal === "question") {
    return (
      <>
        <ViewQuestion
          setModal={setModal}
          user={user}
          course={course}
          setRefreshQList={setRefreshQList}
          question={question}
        />
      </>
    );
  } else if (modal === "edit") {
    return (
      <>
        <QuestionModal
          setModal={setModal}
          user={user}
          course={course}
          setRefreshQList={setRefreshQList}
          question={question}
        />
      </>
    );
  }
}

export function Question({ question, setQuestion, setModal }) {
  return (
    <div
      className="w-full p-5 border border-borderGrey/50 rounded-md flex items-center justify-between gap-4 cursor-pointer"
      onClick={() => {
        setQuestion(question);
        setModal("question");
      }}
    >
      <div className=" flex gap-4 items-start">
        <div className="">
          {question.resolved ? (
            <span>
              <CheckCircleIcon className="w-6 h-6 text-sketch-yellow" />
            </span>
          ) : (
            <span>
              <CheckCircleIcon className="w-6 h-6 text-borderGrey" />
            </span>
          )}
        </div>
        <div className="">
          <p>{question.question}</p>
        </div>
      </div>
      <div className="">
        {question.pinned && <img src="/pin-white.png" width={24} h={24} />}
      </div>
    </div>
  );
}

export function QuestionModal({
  setModal,
  user,
  course,
  question,
  setRefreshQList,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  useEffect(() => {
    if (question) {
      setTitle(question.question);
      setDesc(question.description);
    }
  }, []);

  return (
    <div className="p-5 h-full">
      <form
        className=" h-full flex flex-col"
        action={async (formData) => {
          await postQuestion(formData);
          setModal("list");
          setRefreshQList((r) => !r);
        }}
      >
        <div className="mb-8">
          <h1 className="text-5xl mb-8">Ask a question</h1>
          <div className="mb-4">
            <input
              type="text"
              name="title"
              required
              placeholder="Question title"
              className=" bg-black w-full px-5 h-10 rounded-md border border-borderGrey/50"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <textarea
              type="textArea"
              name="description"
              required
              rows={4}
              placeholder="Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="bg-black w-full px-5 pt-2 rounded-md border border-borderGrey/50"
            />
          </div>
          <div>
            <input
              type="file"
              id="file"
              name="file"
              className={`text-sm ${question && "hidden"}`}
            ></input>
          </div>
          <input type="hidden" name="user" value={user.id} />
          <input type="hidden" name="course" value={course.questions_tag} />
          <input
            type="hidden"
            name="q_edit"
            value={question ? question.id : null}
          />
          <input
            type="hidden"
            name="q_file"
            value={question ? question.file : null}
          />
        </div>
        <div>
          <div className="mb-4 flex items-start md:items-center">
            <input
              type="checkbox"
              name="declaration"
              required
              className="mr-2"
            />

            <p>
              I have checked that the answer to my question does not already
              exist in the forum.
            </p>
          </div>
          <div className="flex">
            <button
              type="submit"
              className="px-6 md:px-8 h-10 bg-primary rounded-full text-sm text-white hover:bg-primary/70 mr-4"
            >
              {question ? "Confirm edit" : "Submit"}
            </button>
            <button
              className="px-6 md:px-8 h-10 rounded-full text-sm text-white border border-white "
              onClick={() => {
                setModal("list");
                setRefreshQList((r) => !r);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export function ViewQuestion({
  setModal,
  user,
  course,
  setRefreshQList,
  question,
}) {
  const [comms, setComms] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [controlCom, setControlCom] = useState(null);
  const [postMethod, setMethod] = useState({ type: "POST" });
  const [form, showForm] = useState(false);

  useEffect(() => {
    async function getComments() {
      const comments = await fetchComments(question.id);
      setComms(comments);
    }
    getComments();
  }, [refresh, question.id]);
  return (
    <div className="h-full relative flex flex-col">
      <div className="">
        <div className="p-5">
          <button
            className="flex text-lightGrey "
            onClick={() => {
              setModal("list");
              setRefreshQList((r) => !r);
            }}
          >
            <span>
              <ArrowLongLeftIcon className="w-6 h-6 mr-2" />
            </span>
            <span>Back</span>
          </button>
        </div>

        <div className="border-b border-borderGrey/50 p-5">
          <div className="mb-4 flex justify-between">
            <div className="">
              <p className="mb-1 font-medium">{question.user_name}</p>
              <p className=" text-lightGrey text-sm uppercase">
                {timeAgo(question.date_created)}
              </p>
            </div>

            <div className=" flex">
              {course.educator_uuid === user.id ||
                (user.role < 3 && (
                  <div className="mr-2">
                    <button
                      onClick={async () => {
                        if (question.pinned) {
                          await pinQuestion(question.id, false);
                          alert("Question has been unpinned");
                        } else if (!question.pinned) {
                          await pinQuestion(question.id, true);
                          alert("Question has been pinned");
                        }
                      }}
                    >
                      <EyeDropperIcon
                        className={`w-6 h-6 ${
                          question.pinned ? "text-white" : " text-borderGrey"
                        }`}
                        title="Pin Question"
                      />
                    </button>
                  </div>
                ))}
              {user.id === question.user && (
                <div>
                  <button
                    className="mr-2"
                    onClick={() => {
                      setModal("edit");
                    }}
                  >
                    <PencilSquareIcon
                      className="w-6 h-6 text-borderGrey"
                      title="Edit Question"
                    />
                  </button>
                  <button
                    onClick={async () => {
                      const result = confirm("Delete this question?");
                      if (result === true) {
                        await deleteQuestion(question.id);
                        setRefreshQList((r) => !r);
                        setModal("list");
                      }
                    }}
                  >
                    <TrashIcon
                      className="w-6 h-6 text-borderGrey"
                      title="Delete Question"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <h1 className="mb-4 text-xl">{question.question}</h1>
            <p className="mb-4">{question.description}</p>
            {question.file && (
              <a
                className="flex text-lightGrey"
                href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${question.file.filename_disk}`}
                target="_blank"
              >
                <span>
                  <ArrowDownTrayIcon className="w-6 h-6 mr-2" />
                </span>
                <span>Download Attachment</span>
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="grow overflow-y-scroll p-5">
        {comms.length > 0 ? (
          <Comments
            comms={comms}
            user={user}
            setControlCom={setControlCom}
            setMethod={setMethod}
            setRefresh={setRefresh}
            question={question}
            course={course}
            showForm={showForm}
          />
        ) : (
          <p>Comments for this question will be automatically loaded.</p>
        )}
      </div>
      <div className="w-full p-5 border-t border-borderGrey/50 rounded-tr-lg rounded-tl-lg bg-black">
        {!form && (
          <input
            placeholder="Add comment"
            className="bg-fullBlack border border-borderGrey/50 rounded-md w-full p-2"
            onClick={() => showForm(true)}
          />
        )}
        {form && (
          <form
            action={async (fData) => {
              if (postMethod.type === "POST") {
                const extra_data = { method: "POST" };
                await postComment(fData, extra_data);
              }
              if (postMethod.type === "PATCH") {
                const extra_data = {
                  method: "PATCH",
                  id: postMethod.id,
                  file: postMethod.file,
                };
                await postComment(fData, extra_data);
              }
              setRefresh((r) => !r);
              setControlCom("");
              setMethod({ type: "POST" });
              showForm(false);
            }}
          >
            <textarea
              rows={2}
              required
              name="comment"
              className=" bg-fullBlack border border-borderGrey/50 rounded-md w-full p-2 mb-2"
              placeholder="Add your comment"
              value={controlCom}
              onChange={(e) => setControlCom(e.target.value)}
            />
            <input type="hidden" name="user_id" value={user.id} />
            <input type="hidden" name="user_name" value={user.name} />
            <input type="hidden" name="question_id" value={question.id} />
            <div className="md:flex max-w-full justify-between items-center mb-4">
              <input
                type="file"
                name="file"
                className={`text-sm mb-2 md:mb-0 ${
                  postMethod.type === "PATCH" && "hidden"
                }`}
              ></input>
              <div>
                <button
                  className="px-6 md:px-8 h-10 bg-primary rounded-full text-sm text-white hover:bg-primary/70"
                  type="submit"
                >
                  {postMethod.type === "POST" ? "Add" : "Edit"}
                </button>
                <button
                  className="px-6 md:px-8 h-10 bg-black rounded-full text-sm text-white"
                  onClick={() => showForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function Comments({
  comms,
  user,
  setControlCom,
  setMethod,
  setRefresh,
  question,
  course,
  showForm,
}) {
  return (
    <div className="">
      {comms.map((comment, i) => {
        return (
          <div
            key={i}
            className="p-5 border border-borderGrey/50 mb-4 rounded-md bg-black/20"
          >
            <div className="mb-4 flex justify-between items-start">
              <div>
                <p className="mb-1 font-medium">{comment.user_name}</p>
                <p className=" text-lightGrey text-sm uppercase">
                  {timeAgo(comment.date_created)}
                </p>
              </div>
              <div className=" flex items-center">
                {(question.user === user.id ||
                  course.educator_uuid === user.id) && (
                  <button
                    className={`mr-2`}
                    onClick={async () => {
                      if (comment.solution === true) {
                        const result = confirm(
                          "Remove this comment as solution?"
                        );
                        if (result === true) {
                          await markSolution(question.id, comment.id, false);
                          setRefresh((r) => !r);
                        }
                      } else if (comment.solution === false) {
                        const result = confirm(
                          "Mark this comment as solution?"
                        );
                        if (result === true) {
                          await markSolution(question.id, comment.id, true);
                          setRefresh((r) => !r);
                        }
                      }
                    }}
                  >
                    <CheckCircleIcon
                      className={`w-6 h-6  ${
                        comment.solution
                          ? " text-sketch-yellow"
                          : "text-borderGrey"
                      }`}
                      title="Mark as solution"
                    />
                  </button>
                )}

                {user.id == comment.user && (
                  <div>
                    <button
                      className="mr-2"
                      onClick={() => {
                        showForm(true);
                        setControlCom(comment.comment);
                        setMethod({
                          type: "PATCH",
                          id: comment.id,
                          file: comment.file,
                        });
                      }}
                    >
                      <PencilSquareIcon
                        className="w-6 h-6 text-borderGrey"
                        title="Edit comment"
                      />
                    </button>
                    <button
                      className=""
                      onClick={async () => {
                        const result = confirm("Delete this comment?");
                        if (result === true) {
                          await deleteComment(comment.id);
                          setRefresh((r) => !r);
                        }
                      }}
                    >
                      <TrashIcon
                        className="w-6 h-6 text-borderGrey"
                        title="Delete comment"
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4">
              <p>{comment.comment}</p>
            </div>
            <div>
              {comment.file && (
                <a
                  className="flex text-lightGrey"
                  href={`${process.env.NEXT_PUBLIC_STORAGE_URL}${comment.file.filename_disk}`}
                  target="_blank"
                >
                  <span>
                    <ArrowDownTrayIcon className="w-6 h-6 mr-2" />
                  </span>{" "}
                  <span>Download Attachment</span>
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
