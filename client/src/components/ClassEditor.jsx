import { Plus, Trash2, Boxes, Code2 } from "lucide-react";

function ClassEditor({ classes, setClasses }) {
  const addClass = () => {
    setClasses([
      ...classes,
      {
        name: "",
        fields: [],
        methods: [],
      },
    ]);
  };

  const removeClass = (classIndex) => {
    setClasses(
      classes.filter((_, index) => index !== classIndex)
    );
  };

  const updateClassName = (classIndex, value) => {
    const updated = [...classes];
    updated[classIndex].name = value;
    setClasses(updated);
  };

  // ---------------- FIELDS ----------------

  const addField = (classIndex) => {
    const updated = [...classes];

    updated[classIndex].fields.push({
      name: "",
      type: "",
    });

    setClasses(updated);
  };

  const updateField = (
    classIndex,
    fieldIndex,
    key,
    value
  ) => {
    const updated = [...classes];

    updated[classIndex].fields[fieldIndex][key] = value;

    setClasses(updated);
  };

  const removeField = (classIndex, fieldIndex) => {
    const updated = [...classes];

    updated[classIndex].fields =
      updated[classIndex].fields.filter(
        (_, index) => index !== fieldIndex
      );

    setClasses(updated);
  };

  // ---------------- METHODS ----------------

  const addMethod = (classIndex) => {
    const updated = [...classes];

    updated[classIndex].methods.push({
      name: "",
      returnType: "",
      parameters: [],
    });

    setClasses(updated);
  };

  const updateMethod = (
    classIndex,
    methodIndex,
    key,
    value
  ) => {
    const updated = [...classes];

    updated[classIndex].methods[methodIndex][key] =
      value;

    setClasses(updated);
  };

  const removeMethod = (classIndex, methodIndex) => {
    const updated = [...classes];

    updated[classIndex].methods =
      updated[classIndex].methods.filter(
        (_, index) => index !== methodIndex
      );

    setClasses(updated);
  };

  return (
    <div className="space-y-6">
      {/* Existing Classes */}
      {classes.map((classItem, classIndex) => (
        <div
          key={classIndex}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* CLASS HEADER */}
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                <Boxes size={20} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Class {classIndex + 1}
                </p>

                <input
                  type="text"
                  placeholder="Class name e.g. Vehicle"
                  value={classItem.name}
                  onChange={(e) =>
                    updateClassName(
                      classIndex,
                      e.target.value
                    )
                  }
                  className="w-full border-0 bg-transparent p-0 text-lg font-bold text-slate-900 placeholder:text-slate-400 outline-none focus:ring-0"
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  removeClass(classIndex)
                }
                title="Delete class"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          {/* CLASS BODY */}
          <div className="p-5">
            {/* FIELDS */}
            <div className="mb-7">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">
                    Fields
                  </h4>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Define the data this class owns.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addField(classIndex)
                  }
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <Plus size={15} />
                  Add Field
                </button>
              </div>

              {classItem.fields.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                  <p className="text-sm text-slate-400">
                    No fields added yet.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      addField(classIndex)
                    }
                    className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    + Add your first field
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {classItem.fields.map(
                    (field, fieldIndex) => (
                      <div
                        key={fieldIndex}
                        className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2 transition hover:border-slate-300"
                      >
                        <span className="w-7 text-center text-xs font-semibold text-slate-400">
                          {fieldIndex + 1}
                        </span>

                        <input
                          type="text"
                          placeholder="Field name"
                          value={field.name}
                          onChange={(e) =>
                            updateField(
                              classIndex,
                              fieldIndex,
                              "name",
                              e.target.value
                            )
                          }
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <input
                          type="text"
                          placeholder="Type e.g. String"
                          value={field.type}
                          onChange={(e) =>
                            updateField(
                              classIndex,
                              fieldIndex,
                              "type",
                              e.target.value
                            )
                          }
                          className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeField(
                              classIndex,
                              fieldIndex
                            )
                          }
                          title="Delete field"
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* METHODS */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">
                    Methods
                  </h4>

                  <p className="mt-0.5 text-xs text-slate-400">
                    Define the behavior and responsibilities.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addMethod(classIndex)
                  }
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  <Plus size={15} />
                  Add Method
                </button>
              </div>

              {classItem.methods.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
                  <p className="text-sm text-slate-400">
                    No methods added yet.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      addMethod(classIndex)
                    }
                    className="mt-2 text-sm font-semibold text-blue-600 hover:underline"
                  >
                    + Add your first method
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {classItem.methods.map(
                    (method, methodIndex) => (
                      <div
                        key={methodIndex}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2
                              size={15}
                              className="text-purple-500"
                            />

                            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                              Method {methodIndex + 1}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              removeMethod(
                                classIndex,
                                methodIndex
                              )
                            }
                            title="Delete method"
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Method name e.g. parkVehicle"
                            value={method.name}
                            onChange={(e) =>
                              updateMethod(
                                classIndex,
                                methodIndex,
                                "name",
                                e.target.value
                              )
                            }
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />

                          <input
                            type="text"
                            placeholder="Return type e.g. boolean"
                            value={method.returnType}
                            onChange={(e) =>
                              updateMethod(
                                classIndex,
                                methodIndex,
                                "returnType",
                                e.target.value
                              )
                            }
                            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ADD CLASS */}
      <button
        type="button"
        onClick={addClass}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white py-5 font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600"
      >
        <Plus size={19} />
        Add Class
      </button>

      {/* Empty state */}
      {classes.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
            <Boxes size={24} />
          </div>

          <h3 className="mt-3 font-bold text-slate-800">
            No classes yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Start by adding the main objects in your system.
          </p>
        </div>
      )}
    </div>
  );
}

export default ClassEditor;