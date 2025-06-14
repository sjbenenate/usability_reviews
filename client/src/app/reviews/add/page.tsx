const AddReviewLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <h3>Add Your Review Here</h3>
      <div>{children}</div>
    </section>
  );
};

export default AddReviewLayout;
