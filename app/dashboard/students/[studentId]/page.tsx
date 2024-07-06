import StudentIndex from "@/views/dashboard/studentIndex";

const Page = ({ params }: { params: { studentId: string } }) => {
  const studentId = params.studentId;

  return <StudentIndex />;
};

export default Page;
