import {
  Plus,
  Trash2,
  GitBranch,
  ArrowRight,
} from "lucide-react";

function RelationshipEditor({
  relationships,
  setRelationships,
  components,
}) {
  const addRelationship = () => {
    setRelationships([
      ...relationships,
      {
        from: "",
        to: "",
        type: "association",
      },
    ]);
  };

  const removeRelationship = (index) => {
    setRelationships(
      relationships.filter((_, i) => i !== index)
    );
  };

  const updateRelationship = (
    index,
    key,
    value
  ) => {
    const updated = [...relationships];

    updated[index][key] = value;

    setRelationships(updated);
  };

  const relationshipTypes = [
    {
      value: "association",
      label: "Association",
      description: "Uses or knows another object",
    },
    {
      value: "aggregation",
      label: "Aggregation",
      description: "Has objects, but they can exist independently",
    },
    {
      value: "composition",
      label: "Composition",
      description: "Owns objects with dependent lifetimes",
    },
    {
      value: "inheritance",
      label: "Inheritance",
      description: "Extends another class",
    },
    {
      value: "implements",
      label: "Implements",
      description: "Class implements an interface",
    },
  ];

  return (
    <div className="space-y-6">
      {/* RELATIONSHIPS */}
      {relationships.map(
        (relationship, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                  <GitBranch size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Relationship {index + 1}
                  </p>

                  <p className="text-xs text-slate-400">
                    Define how two components interact.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  removeRelationship(index)
                }
                title="Delete relationship"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 size={17} />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
                {/* FROM */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Source
                  </label>

                  <select
                    value={relationship.from}
                    onChange={(e) =>
                      updateRelationship(
                        index,
                        "from",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select source
                    </option>

                    {components.map(
                      (component) => (
                        <option
                          key={component}
                          value={component}
                        >
                          {component}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* RELATIONSHIP TYPE */}
                <div className="md:w-52">
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Relationship
                  </label>

                  <select
                    value={relationship.type}
                    onChange={(e) =>
                      updateRelationship(
                        index,
                        "type",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2.5 text-sm font-semibold text-blue-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {relationshipTypes.map(
                      (type) => (
                        <option
                          key={type.value}
                          value={type.value}
                        >
                          {type.label}
                        </option>
                      )
                    )}
                  </select>
                </div>

                {/* TO */}
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Target
                  </label>

                  <select
                    value={relationship.to}
                    onChange={(e) =>
                      updateRelationship(
                        index,
                        "to",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="">
                      Select target
                    </option>

                    {components.map(
                      (component) => (
                        <option
                          key={component}
                          value={component}
                        >
                          {component}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* VISUAL RELATIONSHIP */}
              <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                  <span className="rounded-lg bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-sm">
                    {relationship.from || "Source"}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-400"
                  />

                  <span className="rounded-lg bg-blue-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
                    {relationship.type}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-400"
                  />

                  <span className="rounded-lg bg-white px-3 py-1.5 font-semibold text-slate-700 shadow-sm">
                    {relationship.to || "Target"}
                  </span>
                </div>

                <p className="mt-2 text-center text-xs text-slate-400">
                  {
                    relationshipTypes.find(
                      (type) =>
                        type.value ===
                        relationship.type
                    )?.description
                  }
                </p>
              </div>
            </div>
          </div>
        )
      )}

      {/* EMPTY STATE */}
      {relationships.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <GitBranch size={24} />
          </div>

          <h3 className="mt-3 font-bold text-slate-800">
            No relationships yet
          </h3>

          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            Connect your classes and interfaces to
            describe how they work together.
          </p>
        </div>
      )}

      {/* ADD RELATIONSHIP */}
      <button
        type="button"
        onClick={addRelationship}
        disabled={components.length < 2}
        className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white py-5 font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-600 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
      >
        <Plus size={19} />
        Add Relationship
      </button>

      {/* HELPER MESSAGE */}
      {components.length < 2 && (
        <p className="text-center text-xs text-slate-400">
          Add at least two classes or interfaces before
          creating a relationship.
        </p>
      )}
    </div>
  );
}

export default RelationshipEditor;